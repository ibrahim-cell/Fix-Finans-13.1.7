(function () {
    "use strict";

    function byId(id) { return document.getElementById(id); }
    function esc(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
    function money(value) {
        try {
            return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0);
        } catch { return `₺${Number(value) || 0}`; }
    }
    function today() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    }

    function closeGenericTransactionModal() {
        const modal = byId("transaction-modal");
        if (modal?.classList.contains("active")) {
            if (typeof closeTransactionModal === "function") closeTransactionModal();
            else modal.classList.remove("active");
        }
    }

    function buildTransferModal() {
        if (byId("transferModal")) return byId("transferModal");
        const modal = document.createElement("div");
        modal.id = "transferModal";
        modal.className = "finance-modal transfer-modal";
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
            <div class="finance-modal-content transfer-modal-content" role="dialog" aria-modal="true" aria-labelledby="transfer-modal-title">
                <div class="finance-modal-grabber" aria-hidden="true"></div>
                <div class="finance-modal-header">
                    <div>
                        <span class="section-eyebrow">FİNANS İŞLEMİ</span>
                        <h3 id="transfer-modal-title">Transfer</h3>
                        <p class="modal-subtitle">Bir hesaptan diğerine para aktar.</p>
                    </div>
                    <button type="button" class="modal-close" data-transfer-close aria-label="Pencereyi kapat">×</button>
                </div>
                <form id="transferForm" novalidate>
                    <label for="transferAmount">Tutar<input id="transferAmount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="0,00" required></label>
                    <div class="form-grid-2">
                        <label for="transferFrom">Gönderen hesap<select id="transferFrom" required></select></label>
                        <label for="transferTo">Alıcı hesap<select id="transferTo" required></select></label>
                    </div>
                    <label for="transferDescription">Açıklama<input id="transferDescription" type="text" maxlength="120" placeholder="Örn. Kredi kartı ödemesi"></label>
                    <label for="transferDate">Tarih<input id="transferDate" type="date" required></label>
                    <div id="transferFormError" class="form-error" role="alert" hidden></div>
                    <div class="form-actions">
                        <button type="button" class="form-button secondary" data-transfer-close>Vazgeç</button>
                        <button type="submit" class="form-button primary">Kaydet</button>
                    </div>
                </form>
            </div>`;
        document.body.appendChild(modal);

        modal.addEventListener("click", (event) => {
            if (event.target === modal || event.target.closest("[data-transfer-close]")) closeTransferModal();
        });
        byId("transferForm").addEventListener("submit", saveTransfer);
        return modal;
    }

    function getAccounts() {
        const accounts = window.FixFinansProfileManagement?.getAccounts?.() || [];
        if (accounts.length) return accounts;
        return [
            { id: "cash", name: "Nakit" },
            { id: "bank", name: "Banka Hesabı" },
            { id: "credit-card", name: "Kredi Kartı" }
        ];
    }

    function fillTransferAccounts() {
        const from = byId("transferFrom");
        const to = byId("transferTo");
        if (!from || !to) return;
        const accounts = getAccounts();
        const html = `<option value="">Hesap seç</option>` + accounts.map(a => `<option value="${esc(a.id)}">${esc(a.name)}</option>`).join("");
        from.innerHTML = html;
        to.innerHTML = html;
    }

    function openTransferModal() {
        closeGenericTransactionModal();
        const modal = buildTransferModal();
        fillTransferAccounts();
        const form = byId("transferForm");
        form.reset();
        byId("transferDate").value = today();
        byId("transferFormError").hidden = true;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        setTimeout(() => byId("transferAmount")?.focus(), 30);
    }

    function closeTransferModal() {
        const modal = byId("transferModal");
        if (!modal) return;
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function saveTransfer(event) {
        event.preventDefault();
        const amount = Number(byId("transferAmount")?.value);
        const fromId = byId("transferFrom")?.value;
        const toId = byId("transferTo")?.value;
        const date = byId("transferDate")?.value || today();
        const note = (byId("transferDescription")?.value || "").trim();
        const error = byId("transferFormError");
        const accounts = getAccounts();
        const from = accounts.find(a => a.id === fromId);
        const to = accounts.find(a => a.id === toId);
        if (!Number.isFinite(amount) || amount <= 0) return showTransferError("Geçerli bir tutar gir.");
        if (!fromId || !from) return showTransferError("Gönderen hesap seç.");
        if (!toId || !to) return showTransferError("Alıcı hesap seç.");
        if (fromId === toId) return showTransferError("Gönderen ve alıcı hesap aynı olamaz.");
        if (!date) return showTransferError("Tarih seç.");

        const transaction = {
            id: typeof createTransactionId === "function" ? createTransactionId() : Date.now().toString(36),
            type: "transfer",
            amount,
            category: "Transfer",
            categoryId: "transfer",
            description: note || `${from.name} → ${to.name}`,
            date,
            account: from.name,
            accountId: from.id,
            fromAccount: from.name,
            fromAccountId: from.id,
            toAccount: to.name,
            toAccountId: to.id,
            createdAt: new Date().toISOString()
        };
        if (typeof validateTransaction === "function" && !validateTransaction(transaction)) {
            return showTransferError("Transfer bilgileri geçersiz.");
        }
        if (!appState?.transactions) return showTransferError("İşlem deposu hazır değil.");
        appState.transactions.unshift(transaction);
        if (typeof saveTransactions === "function") saveTransactions();
        if (typeof refreshAllViews === "function") refreshAllViews();
        closeTransferModal();
        if (typeof showToast === "function") showToast("Transfer başarıyla eklendi.", "success");
    }

    function showTransferError(message) {
        const el = byId("transferFormError");
        if (!el) return;
        el.textContent = message;
        el.hidden = false;
    }

    function buildDetailModal() {
        if (byId("transactionDetailModal")) return byId("transactionDetailModal");
        const modal = document.createElement("div");
        modal.id = "transactionDetailModal";
        modal.className = "finance-modal transaction-detail-modal";
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `<div class="finance-modal-content transaction-detail-content" role="dialog" aria-modal="true" aria-labelledby="transaction-detail-title">
            <div class="finance-modal-grabber" aria-hidden="true"></div>
            <div class="finance-modal-header"><div><span class="section-eyebrow">İŞLEM DETAYI</span><h3 id="transaction-detail-title">Detay</h3></div><button type="button" class="modal-close" data-detail-close aria-label="Detayı kapat">×</button></div>
            <div id="transactionDetailBody" class="transaction-detail-body"></div>
        </div>`;
        document.body.appendChild(modal);
        modal.addEventListener("click", (event) => {
            if (event.target === modal || event.target.closest("[data-detail-close]")) closeDetailModal();
        });
        return modal;
    }

    function openDetailModal(transaction) {
        const modal = buildDetailModal();
        const body = byId("transactionDetailBody");
        if (!transaction || !body) return;
        const isTransfer = transaction.type === "transfer";
        const isIncome = transaction.type === "income";
        const typeLabel = isTransfer ? "Transfer" : isIncome ? "Gelir" : transaction.type === "debt" ? "Borç / Alacak" : "Gider";
        const amountLabel = `${isTransfer ? "⇄" : isIncome ? "+" : "-"} ${money(transaction.amount)}`;
        body.innerHTML = `
            <div class="transaction-detail-hero ${isIncome ? "income" : transaction.type === "debt" ? "debt" : isTransfer ? "transfer" : "expense"}"><span>${esc(typeLabel)}</span><strong>${esc(amountLabel)}</strong></div>
            <div class="transaction-detail-grid">
                <div><span>İşlem türü</span><strong>${esc(typeLabel)}</strong></div>
                <div><span>Tutar</span><strong>${esc(money(transaction.amount))}</strong></div>
                ${isTransfer ? `<div><span>Gönderen hesap</span><strong>${esc(transaction.fromAccount || transaction.account || "—")}</strong></div><div><span>Alıcı hesap</span><strong>${esc(transaction.toAccount || "—")}</strong></div>` : `<div><span>Kategori</span><strong>${esc(transaction.category || "—")}</strong></div><div><span>Hesap</span><strong>${esc(transaction.account || "—")}</strong></div>`}
                <div><span>Açıklama</span><strong>${esc(transaction.description || "—")}</strong></div>
                <div><span>Tarih</span><strong>${esc(transaction.date || "—")}</strong></div>
            </div>`;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeDetailModal() {
        const modal = byId("transactionDetailModal");
        if (!modal) return;
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function initTransactionSwipe() {
        const lists = [document.querySelector(".transactions-list"), byId("all-transactions-list")].filter(Boolean);
        const OPEN_X = 126;
        const THRESHOLD = 44;

        lists.forEach((list) => {
            let startX = 0, startY = 0, currentX = 0;
            let article = null, horizontal = false, tracking = false, startWasOpen = false;

            list.addEventListener("touchstart", (event) => {
                const target = event.target.closest(".transaction-item");
                if (!target || event.touches.length !== 1) return;
                const touch = event.touches[0];
                article = target;
                startX = touch.clientX;
                startY = touch.clientY;
                startWasOpen = article.classList.contains("swipe-open");
                currentX = startWasOpen ? OPEN_X : 0;
                horizontal = false;
                tracking = true;
            }, { passive: true });

            list.addEventListener("touchmove", (event) => {
                if (!tracking || !article || event.touches.length !== 1) return;
                const touch = event.touches[0];
                const dx = touch.clientX - startX;
                const dy = touch.clientY - startY;

                if (!horizontal) {
                    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
                    if (Math.abs(dy) > Math.abs(dx)) { tracking = false; return; }
                    horizontal = true;
                }

                event.preventDefault();
                const base = startWasOpen ? OPEN_X : 0;
                currentX = Math.max(0, Math.min(OPEN_X, base - dx));
                const content = article.querySelector(".transaction-swipe-content");
                if (content) content.style.transform = `translate3d(${currentX}px,0,0)`;
            }, { passive: false });

            list.addEventListener("touchend", () => {
                if (!article) return;
                if (horizontal) {
                    const open = currentX >= THRESHOLD;
                    document.querySelectorAll(".transaction-item.swipe-open").forEach((item) => {
                        if (item !== article) {
                            item.classList.remove("swipe-open");
                            item.querySelector(".transaction-swipe-content")?.style.removeProperty("transform");
                        }
                    });
                    article.classList.toggle("swipe-open", open);
                    article.querySelector(".transaction-swipe-content")?.style.removeProperty("transform");
                }
                tracking = false; horizontal = false; article = null; startWasOpen = false;
            }, { passive: true });

            list.addEventListener("touchcancel", () => {
                article?.querySelector(".transaction-swipe-content")?.style.removeProperty("transform");
                tracking = false; horizontal = false; article = null; startWasOpen = false;
            }, { passive: true });
        });

        if (window.__fixFinansSwipeClickBound) return;
        window.__fixFinansSwipeClickBound = true;
        document.addEventListener("click", (event) => {
            const actionButton = event.target.closest(".swipe-action");
            if (actionButton) {
                const article = actionButton.closest(".transaction-item");
                if (!article) return;
                const id = article.dataset.id;
                const transaction = typeof findTransactionById === "function" ? findTransactionById(id) : null;
                const action = actionButton.dataset.action;
                article.classList.remove("swipe-open");
                article.querySelector(".transaction-swipe-content")?.style.removeProperty("transform");
                if (!transaction) return;
                event.preventDefault();
                event.stopPropagation();
                if (action === "edit" && typeof editTransaction === "function") editTransaction(id);
                else if (action === "delete" && typeof openDeleteConfirmation === "function") openDeleteConfirmation(id);
                else if (action === "detail") openDetailModal(transaction);
                return;
            }

            const openCard = event.target.closest(".transaction-item.swipe-open");
            if (openCard && !event.target.closest(".transaction-swipe-actions")) {
                openCard.classList.remove("swipe-open");
                openCard.querySelector(".transaction-swipe-content")?.style.removeProperty("transform");
            }
        });
    }

    function patchListClick() {
        const handler = function (event) {
            const detailButton = event.target.closest('[data-action="detail"]');
            if (!detailButton) return;
            const article = detailButton.closest(".transaction-item");
            if (!article) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            if (typeof closeAllTransactionMenus === "function") closeAllTransactionMenus();
            const id = article.dataset.id;
            const transaction = typeof findTransactionById === "function" ? findTransactionById(id) : null;
            if (transaction) openDetailModal(transaction);
        };
        document.addEventListener("click", handler, true);
    }

    function patchRouting() {
        document.querySelectorAll(".quick-action").forEach(button => {
            const label = button.querySelector(".quick-action-label")?.textContent.trim();
            if (label === "Transfer") {
                button.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); openTransferModal(); }, true);
            }
            if (label === "Borç / Alacak") {
                button.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); closeGenericTransactionModal(); if (typeof window.FixFinansDebtUI?.openCreateModal === "function") window.FixFinansDebtUI.openCreateModal(); }, true);
            }
        });
        document.querySelectorAll('.transaction-type[data-type="transfer"]').forEach(button => {
            button.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); openTransferModal(); }, true);
        });
        document.querySelectorAll('.transaction-type[data-type="debt"]').forEach(button => {
            button.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); closeGenericTransactionModal(); if (typeof window.FixFinansDebtUI?.openCreateModal === "function") window.FixFinansDebtUI.openCreateModal(); }, true);
        });
    }

    function patchDebtModal() {
        const modal = byId("debtReceivableModal");
        if (!modal) return;
        modal.classList.add("compact-bottom-sheet");
    }

    function init() {
        initTransactionSwipe();
        patchListClick();
        patchRouting();
        patchDebtModal();
        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;
            closeTransferModal();
            closeDetailModal();
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
    else init();
})();
