/* Fix Finans — Application runtime / UI controllers */

/* ========================================
   FINANS UYGULAMASI
   APP.JS
======================================== */


/* ========================================
   STORAGE
======================================== */

const STORAGE_KEY =
    "finance_transactions";

const GOALS_STORAGE_KEY =
    "finance_goals";


/* ========================================
   UYGULAMA DURUMU
======================================== */

const DEFAULT_SETTINGS = {

    name: "İbrahim",

    currency: "TRY",

    hideBalance: false,

    notifications: true,

    theme: "dark"

};

const SUPPORTED_CURRENCIES = [
    "TRY",
    "USD",
    "EUR",
    "GBP"
];

const appState = {

    balanceVisible: true,

    activeNavigation: "Ana Sayfa",

    activeTransactionType: "income",

    transactions: [],

    goals: [],

    transactionFilters: {

        type: "all",

        category: "all",

        search: "",

        sort: "date-desc"

    },

    analyticsMonth: null,

    reportPeriod: "monthly",

    settings: {

        ...DEFAULT_SETTINGS

    }

};


/* ========================================
   DOM
======================================== */

const balanceTitle =
    document.querySelector("#balance-title");

const balanceVisibilityButton =
    document.querySelector(".balance-visibility");

const navigationItems =
    document.querySelectorAll(".nav-item");

const quickActionButtons =
    document.querySelectorAll(".quick-action");

const transactionModal =
    document.querySelector("#transaction-modal");

const transactionModalClose =
    document.querySelector("#modal-close");

const transactionModalCancel =
    document.querySelector("#modal-cancel");

const transactionForm =
    document.querySelector("#transaction-form");

const transactionTypeButtons =
    document.querySelectorAll(".transaction-type");

const transactionDate =
    document.querySelector("#transaction-date");

const transactionsList =
    document.querySelector(".transactions-list");

const transactionsPage =
    document.querySelector("#transactions-page");

const debtReceivablePage =
    document.querySelector("#debt-receivable-page");

const allTransactionsList =
    document.querySelector("#all-transactions-list");

const transactionSearch =
    document.querySelector("#transaction-search");

const searchClear =
    document.querySelector("#search-clear");

const filterChips =
    document.querySelectorAll(".filter-chip");

const categoryFilter =
    document.querySelector("#transaction-category-filter");

const sortSelect =
    document.querySelector("#transaction-sort-select");

const txMonthLabel =
    document.querySelector("#tx-month-label");

const txMonthIncome =
    document.querySelector("#tx-month-income");

const txMonthExpense =
    document.querySelector("#tx-month-expense");

const transactionsFilterButton =
    document.querySelector("#transactions-filter-button");

const transactionsBackButton =
    document.querySelector("#transactions-back-button");

const resultCount =
    document.querySelector("#transaction-result-count");

const analyticsPage =
    document.querySelector(
        "#analytics-page"
    );

const analyticsMonth =
    document.querySelector(
        "#analytics-month"
    );

const analyticsIncome =
    document.querySelector(
        "#analytics-income"
    );

const analyticsExpense =
    document.querySelector(
        "#analytics-expense"
    );

const analyticsNet =
    document.querySelector(
        "#analytics-net"
    );

const analyticsIncomeChange =
    document.querySelector(
        "#analytics-income-change"
    );

const analyticsExpenseChange =
    document.querySelector(
        "#analytics-expense-change"
    );

const analyticsSavingRate =
    document.querySelector(
        "#analytics-saving-rate"
    );

const dashboardMonthlyIncome =
    document.querySelector(
        "#dashboard-monthly-income"
    );

const dashboardMonthlyExpense =
    document.querySelector(
        "#dashboard-monthly-expense"
    );

const dashboardMonthlyNet =
    document.querySelector(
        "#dashboard-monthly-net"
    );

const dashboardMonthlyChange =
    document.querySelector(
        "#dashboard-monthly-change"
    );

const dashboardMonthlyChart =
    document.querySelector(
        "#dashboard-monthly-chart"
    );

const dashboardExpenseChart =
    document.querySelector(
        "#dashboard-expense-chart"
    );

const dashboardExpenseCategories =
    document.querySelector(
        "#dashboard-expense-categories"
    );

const monthlyChart =
    document.querySelector(
        "#monthly-chart"
    );

const expenseDonut =
    document.querySelector(
        "#expense-donut"
    );

const donutTotal =
    document.querySelector(
        "#donut-total"
    );

const categoryLegend =
    document.querySelector(
        "#category-legend"
    );

const topExpenseCategory =
    document.querySelector(
        "#top-expense-category"
    );

const topExpenseCategoryValue =
    document.querySelector(
        "#top-expense-category-value"
    );

const highestExpense =
    document.querySelector(
        "#highest-expense"
    );

const highestExpenseValue =
    document.querySelector(
        "#highest-expense-value"
    );

const highestIncome =
    document.querySelector(
        "#highest-income"
    );

const highestIncomeValue =
    document.querySelector(
        "#highest-income-value"
    );

const analyticsTransactionCount =
    document.querySelector(
        "#analytics-transaction-count"
    );

const yearlyChart =
    document.querySelector(
        "#yearly-chart"
    );

const goalsPage =
    document.querySelector("#goals-page");

const goalsList =
    document.querySelector("#goals-list");

const goalsTotalTarget =
    document.querySelector("#goals-total-target");

const goalsTotalSaved =
    document.querySelector("#goals-total-saved");

const goalsOverallPercent =
    document.querySelector("#goals-overall-percent");

const goalsOverallBar =
    document.querySelector("#goals-overall-bar");

const goalsCount =
    document.querySelector("#goals-count");

const goalModal =
    document.querySelector("#goal-modal");

const goalForm =
    document.querySelector("#goal-form");

const goalNameInput =
    document.querySelector("#goal-name");

const goalTargetInput =
    document.querySelector("#goal-target");

const goalCurrentInput =
    document.querySelector("#goal-current");

const goalIconInput =
    document.querySelector("#goal-icon");

const goalModalClose =
    document.querySelector("#goal-modal-close");

const goalModalCancel =
    document.querySelector("#goal-modal-cancel");

const goalsBackButton =
    document.querySelector("#goals-back-button");

const goalsAddButton =
    document.querySelector("#goals-add-button");

const dashboardGoalsList =
    document.querySelector("#dashboard-goals-list");

const profilePage =
    document.querySelector("#profile-page");

const settingsPage =
    document.querySelector("#settings-page");

const profileName =
    document.querySelector("#profile-name");

const profileInfoName =
    document.querySelector("#profile-info-name");

const profileInfoCurrency =
    document.querySelector("#profile-info-currency");

const profileTransactionCount =
    document.querySelector("#profile-transaction-count");

const profileTotalIncome =
    document.querySelector("#profile-total-income");

const profileTotalExpense =
    document.querySelector("#profile-total-expense");

const profileTotalNet =
    document.querySelector("#profile-total-net");

const currencySetting =
    document.querySelector("#currency-setting");

const hideBalanceSetting =
    document.querySelector("#hide-balance-setting");

const notificationSetting =
    document.querySelector("#notification-setting");

const exportDataButton =
    document.querySelector("#export-data-button");

const importDataButton =
    document.querySelector("#import-data-button");

const importFileInput =
    document.querySelector("#import-file-input");

const deleteAllDataButton =
    document.querySelector("#delete-all-data-button");

const profileEditButton =
    document.querySelector("#profile-edit-button");

const themeOptions =
    document.querySelectorAll(".theme-option");

const settingsButton =
    document.querySelector("#settings-button");

const notificationButton =
    document.querySelector("#notification-button");

const homeMenuButton =
    document.querySelector(".home-menu-button");

const headerProfileName =
    document.querySelector("#header-profile-name");

const headerProfileAvatar =
    document.querySelector("#header-profile-avatar");

const toastContainer =
    document.querySelector("#toast-container");


function showToast(message, type = "success") {

    if (!toastContainer) {
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = type === "success" ? "✓" : "×";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span>${escapeHtml(message)}</span>
    `;

    toastContainer.appendChild(toast);

    window.setTimeout(() => {
        toast.classList.add("toast-out");
        window.setTimeout(() => toast.remove(), 220);
    }, 2400);

}


function normalizeSettings(settings) {

    const source =
        settings && typeof settings === "object"
            ? settings
            : {};

    const currency =
        SUPPORTED_CURRENCIES.includes(source.currency)
            ? source.currency
            : DEFAULT_SETTINGS.currency;

    return {

        ...DEFAULT_SETTINGS,

        ...source,

        name:
            typeof source.name === "string" && source.name.trim()
                ? source.name.trim().slice(0, 60)
                : DEFAULT_SETTINGS.name,

        currency,

        hideBalance:
            source.hideBalance === true,

        notifications:
            source.notifications !== false,

        theme:
            source.theme === "light" ? "light" : "dark"

    };

}

function validateTransaction(transaction) {

    if (!transaction || typeof transaction !== "object") {
        return false;
    }

    if (!transaction.id || typeof transaction.id !== "string") {
        return false;
    }

    if (!["income", "expense", "transfer", "debt"].includes(transaction.type)) {
        return false;
    }

    if (!Number.isFinite(Number(transaction.amount)) || Number(transaction.amount) <= 0) {
        return false;
    }

    if (typeof transaction.description !== "string" || !transaction.description.trim()) {
        return false;
    }

    if (typeof transaction.category !== "string" || !transaction.category.trim()) {
        return false;
    }

    if (typeof transaction.date !== "string" || !transaction.date.trim()) {
        return false;
    }

    return true;

}

function getTransactionTimestamp(transaction) {

    const source =
        transaction?.createdAt ||
        transaction?.date;

    const timestamp =
        new Date(source).getTime();

    return Number.isFinite(timestamp)
        ? timestamp
        : 0;

}

function displayAmount(value) {

    if (appState.settings?.hideBalance) {
        return "••••••";
    }

    return formatCurrency(value);

}

/* ========================================
   PARA FORMATLAMA
======================================== */

function formatCurrency(amount) {

    const currency =
        appState.settings?.currency ||
        "TRY";

    return new Intl.NumberFormat(
        "tr-TR",
        {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(
        Number(amount) || 0
    );

}


/* ========================================
   LOCALSTORAGE'DAN VERİ OKU
======================================== */

function validateStoredTransaction(transaction) {

    if (!transaction || typeof transaction !== "object") return false;
    if (!["income", "expense", "transfer", "debt"].includes(transaction.type)) return false;
    if (!Number.isFinite(Number(transaction.amount)) || Number(transaction.amount) <= 0) return false;
    if (typeof transaction.description !== "string" || !transaction.description.trim()) return false;
    if (typeof transaction.category !== "string" || !transaction.category.trim()) return false;
    if (typeof transaction.date !== "string" || !transaction.date.trim()) return false;
    return true;

}


function validateStoredGoal(goal) {

    if (!goal || typeof goal !== "object") return false;
    if (typeof goal.id !== "string" || !goal.id) return false;
    if (typeof goal.name !== "string" || !goal.name.trim()) return false;
    if (!Number.isFinite(Number(goal.targetAmount)) || Number(goal.targetAmount) <= 0) return false;
    if (!Number.isFinite(Number(goal.currentAmount)) || Number(goal.currentAmount) < 0) return false;
    if (Number(goal.currentAmount) > Number(goal.targetAmount)) return false;
    return true;
}

function loadGoals() {
    try {
        const stored = localStorage.getItem(GOALS_STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        appState.goals = Array.isArray(parsed) ? parsed.filter(validateStoredGoal) : [];
    } catch (error) {
        console.error("Hedefler yüklenemedi:", error);
        appState.goals = [];
    }
}

function saveGoals() {
    try {
        localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(appState.goals));
    } catch (error) {
        console.error("Hedefler kaydedilemedi:", error);
    }
}

function createGoalId() {
    return `goal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function goalProgress(goal) {
    const target = Number(goal?.targetAmount) || 0;
    const current = Number(goal?.currentAmount) || 0;
    return target > 0 ? Math.min(100, Math.max(0, (current / target) * 100)) : 0;
}

function openGoalModal() {
    if (!goalModal || !goalForm) return;
    goalForm.reset();
    if (goalIconInput) goalIconInput.value = "🎯";
    goalModal.hidden = false;
    goalModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => goalNameInput?.focus(), 80);
}

function closeGoalModal() {
    if (!goalModal) return;
    goalModal.hidden = true;
    goalModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function renderGoals() {
    if (!goalsList) return;

    if (!appState.goals.length) {
        goalsList.innerHTML = `
            <div class="goals-empty">
                <div class="goals-empty-icon">✦</div>
                <strong>Henüz hedefin yok</strong>
                <span>Bir hedef oluştur ve birikimini takip etmeye başla.</span>
                <button type="button" class="primary-action-button" data-goal-create>+ Yeni Hedef</button>
            </div>`;
    } else {
        goalsList.innerHTML = appState.goals.map((goal) => {
            const progress = goalProgress(goal);
            const remaining = Math.max(0, Number(goal.targetAmount) - Number(goal.currentAmount));
            return `
                <article class="goal-card" data-goal-id="${escapeHtml(goal.id)}">
                    <div class="goal-card-top">
                        <div class="goal-icon">${escapeHtml(goal.icon || "🎯")}</div>
                        <div class="goal-title-wrap">
                            <span>Hedef</span>
                            <h3>${escapeHtml(goal.name)}</h3>
                        </div>
                        <button type="button" class="goal-delete-button" data-goal-delete="${escapeHtml(goal.id)}" aria-label="Hedefi sil">×</button>
                    </div>
                    <div class="goal-amount-row">
                        <strong>${displayAmount(goal.currentAmount)}</strong>
                        <span>/ ${displayAmount(goal.targetAmount)}</span>
                    </div>
                    <div class="goal-progress-track"><span style="width:${progress.toFixed(2)}%"></span></div>
                    <div class="goal-meta-row">
                        <span>%${progress.toFixed(0)} tamamlandı</span>
                        <span>${remaining > 0 ? `${displayAmount(remaining)} kaldı` : "Hedef tamamlandı ✓"}</span>
                    </div>
                    <button type="button" class="goal-contribute-button" data-goal-contribute="${escapeHtml(goal.id)}">+ Birikim Ekle</button>
                </article>`;
        }).join("");
    }

    const totalTarget = appState.goals.reduce((sum, goal) => sum + Number(goal.targetAmount), 0);
    const totalSaved = appState.goals.reduce((sum, goal) => sum + Number(goal.currentAmount), 0);
    const overall = totalTarget > 0 ? Math.min(100, (totalSaved / totalTarget) * 100) : 0;

    if (goalsTotalTarget) goalsTotalTarget.textContent = displayAmount(totalTarget);
    if (goalsTotalSaved) goalsTotalSaved.textContent = displayAmount(totalSaved);
    if (goalsOverallPercent) goalsOverallPercent.textContent = `%${overall.toFixed(0)}`;
    if (goalsOverallBar) goalsOverallBar.style.width = `${overall.toFixed(2)}%`;
    if (goalsCount) goalsCount.textContent = `${appState.goals.length} hedef`;

    renderDashboardGoals();
}

function renderDashboardGoals() {
    if (!dashboardGoalsList) return;
    const items = appState.goals.slice(0, 3);
    if (!items.length) {
        dashboardGoalsList.innerHTML = `<div class="dashboard-goals-empty">Henüz hedef eklenmedi. <button type="button" data-goal-create>Yeni hedef oluştur</button></div>`;
        return;
    }
    dashboardGoalsList.innerHTML = items.map((goal) => {
        const progress = goalProgress(goal);
        return `<button type="button" class="dashboard-goal-row" data-goal-open>
            <span class="dashboard-goal-icon">${escapeHtml(goal.icon || "🎯")}</span>
            <span class="dashboard-goal-content"><strong>${escapeHtml(goal.name)}</strong><small>${displayAmount(goal.currentAmount)} / ${displayAmount(goal.targetAmount)}</small><span class="mini-goal-bar"><i style="width:${progress.toFixed(2)}%"></i></span></span>
            <b>%${progress.toFixed(0)}</b>
        </button>`;
    }).join("");
}

function saveGoalFromForm() {
    const name = goalNameInput?.value.trim() || "";
    const target = Number(goalTargetInput?.value);
    const current = Number(goalCurrentInput?.value || 0);
    const icon = (goalIconInput?.value.trim() || "🎯").slice(0, 2);

    if (!name) { showToast("Hedef adı gerekli.", "error"); return; }
    if (!Number.isFinite(target) || target <= 0) { showToast("Hedef tutarı 0'dan büyük olmalı.", "error"); return; }
    if (!Number.isFinite(current) || current < 0 || current > target) { showToast("Mevcut tutar hedef tutarını aşamaz.", "error"); return; }

    appState.goals.push({ id: createGoalId(), name: name.slice(0, 80), icon, targetAmount: target, currentAmount: current, createdAt: new Date().toISOString() });
    saveGoals();
    renderGoals();
    closeGoalModal();
    showToast("Yeni hedef oluşturuldu.", "success");
}

function ensurePremiumInputModal() {
    let modal = document.querySelector("#premium-input-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "premium-input-modal";
    modal.className = "premium-input-modal";
    modal.hidden = true;
    modal.innerHTML = `
        <div class="premium-input-backdrop" data-premium-close></div>
        <section class="premium-input-sheet" role="dialog" aria-modal="true" aria-labelledby="premium-input-title">
            <div class="premium-sheet-grabber"></div>
            <div class="premium-input-head">
                <div><span class="section-label" id="premium-input-kicker">İşlem</span><h2 id="premium-input-title">Bilgi Gir</h2></div>
                <button type="button" class="mobile-filter-button" data-premium-close aria-label="Kapat">×</button>
            </div>
            <form id="premium-input-form" class="premium-input-form">
                <label id="premium-input-label" for="premium-input-value">Değer</label>
                <input id="premium-input-value" autocomplete="off" inputmode="text" required>
                <select id="premium-input-select" hidden></select>
                <div class="premium-input-actions"><button type="button" class="form-button secondary" data-premium-close>Vazgeç</button><button type="submit" class="form-button primary">Devam</button></div>
            </form>
        </section>`;
    document.body.appendChild(modal);
    const close=()=>{modal.hidden=true;document.body.classList.remove("modal-open");};
    modal.querySelectorAll("[data-premium-close]").forEach(el=>el.addEventListener("click",close));
    modal.addEventListener("keydown",e=>{if(e.key==="Escape") close();});
    modal._close=close;
    return modal;
}

function openPremiumInputModal({title,kicker="İşlem",label="Değer",value="",inputMode="text",options=null,submitLabel="Devam",onSubmit}) {
    const modal=ensurePremiumInputModal();
    const titleEl=modal.querySelector("#premium-input-title");
    const kickerEl=modal.querySelector("#premium-input-kicker");
    const labelEl=modal.querySelector("#premium-input-label");
    const input=modal.querySelector("#premium-input-value");
    const select=modal.querySelector("#premium-input-select");
    const form=modal.querySelector("#premium-input-form");
    titleEl.textContent=title; kickerEl.textContent=kicker; labelEl.textContent=label;
    input.hidden=Array.isArray(options); select.hidden=!Array.isArray(options);
    if (Array.isArray(options)) {
        select.innerHTML=options.map(o=>`<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join("");
        select.value=options[0]?.value||"";
    } else { input.type=inputMode==="number"?"number":"text"; input.inputMode=inputMode; input.value=value; }
    const submit=form.querySelector("button[type=submit]"); submit.textContent=submitLabel;
    form.onsubmit=(event)=>{event.preventDefault(); const val=Array.isArray(options)?select.value:input.value; onSubmit?.(val,modal._close);};
    modal.hidden=false; document.body.classList.add("modal-open");
    setTimeout(()=> (Array.isArray(options)?select:input).focus(),60);
    return modal;
}

function contributeToGoal(id) {
    const goal = appState.goals.find((item) => item.id === id);
    if (!goal) return;
    const remaining = Math.max(0, Number(goal.targetAmount) - Number(goal.currentAmount));
    if (remaining <= 0) { showToast("Bu hedef zaten tamamlandı.", "success"); return; }
    openPremiumInputModal({
        title: "Birikim Ekle", kicker: goal.name, label: `Eklenecek tutar (kalan ${displayAmount(remaining)})`, value: "1000", inputMode: "number", submitLabel: "Birikime Ekle",
        onSubmit: (raw, close) => {
            const amount = Number(String(raw).replace(",", "."));
            if (!Number.isFinite(amount) || amount <= 0) { showToast("Geçerli bir tutar gir.", "error"); return; }
            if (amount > remaining) { showToast("Birikim tutarı kalan hedeften büyük olamaz.", "error"); return; }
            goal.currentAmount = Number(goal.currentAmount) + amount;
            saveGoals(); renderGoals(); close();
            showToast(amount === remaining ? "Hedef tamamlandı! 🎉" : "Birikim hedefe eklendi.", "success");
        }
    });
}

function deleteGoal(id) {
    const goal = appState.goals.find((item) => item.id === id);
    if (!goal) return;
    if (!window.confirm(`“${goal.name}” hedefi silinsin mi?`)) return;
    appState.goals = appState.goals.filter((item) => item.id !== id);
    saveGoals();
    renderGoals();
    showToast("Hedef silindi.", "success");
}

function loadTransactions() {

    try {

        const storedTransactions =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!storedTransactions) {

            appState.transactions = [];

            return;

        }


        const parsedTransactions =
            JSON.parse(
                storedTransactions
            );


        if (
            Array.isArray(
                parsedTransactions
            )
        ) {

            const validTransactions =
                parsedTransactions.filter(
                    validateStoredTransaction
                );

            appState.transactions =
                validTransactions;

        } else {

            appState.transactions = [];

        }

    } catch (error) {

        console.error(
            "İşlemler yüklenemedi:",
            error
        );

        appState.transactions = [];

    }

}


/* ========================================
   LOCALSTORAGE'A VERİ KAYDET
======================================== */

function saveTransactions() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                appState.transactions
            )
        );

    } catch (error) {

        console.error(
            "İşlemler kaydedilemedi:",
            error
        );

    }

}


/* ========================================
   ID OLUŞTUR
======================================== */

function createTransactionId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );

}


/* ========================================
   BAKİYE
======================================== */

function calculateBalance() {

    let income = 0;
    let expense = 0;


    appState.transactions.forEach(
        (transaction) => {

            const amount =
                Number(
                    transaction.amount
                ) || 0;


            if (
                transaction.type ===
                "income"
            ) {

                income += amount;

            }


            if (
                transaction.type ===
                "expense"
            ) {

                expense += amount;

            }

        }
    );


    return {
        income,
        expense,
        balance: income - expense
    };

}


/* ========================================
   DASHBOARD BAKİYE GÜNCELLE
======================================== */


function updateBalanceVisibilityIcon() {

    if (!balanceVisibilityButton) {
        return;
    }

    const hidden =
        appState.settings?.hideBalance === true;

    const slash =
        balanceVisibilityButton.querySelector(
            ".balance-eye-slash"
        );

    if (slash) {
        slash.style.opacity = hidden ? "1" : "0";
    }

    balanceVisibilityButton.classList.toggle(
        "is-hidden",
        hidden
    );

    balanceVisibilityButton.setAttribute(
        "aria-label",
        hidden
            ? "Bakiyeyi göster"
            : "Bakiyeyi gizle"
    );

    balanceVisibilityButton.setAttribute(
        "title",
        hidden
            ? "Bakiyeyi göster"
            : "Bakiyeyi gizle"
    );

}


function animateBalance() {

    const balance = document.querySelector("#balance-title");

    if (!balance || appState.settings?.hideBalance) {
        return;
    }

    balance.classList.remove("balance-updated");
    void balance.offsetWidth;
    balance.classList.add("balance-updated");

}


function updateDashboardBalance() {

    const totals =
        calculateBalance();

    const shouldHide =
        appState.settings?.hideBalance === true;

    if (balanceTitle) {

        balanceTitle.textContent =
            shouldHide
                ? "••••••"
                : formatCurrency(totals.balance);

    }

    const balanceItems =
        document.querySelectorAll(
            ".balance-item strong"
        );

    if (balanceItems.length >= 2) {

        balanceItems[0].textContent =
            shouldHide
                ? "••••••"
                : `+ ${formatCurrency(totals.income)}`;

        balanceItems[1].textContent =
            shouldHide
                ? "••••••"
                : `- ${formatCurrency(totals.expense)}`;

    }

    appState.balanceVisible = !shouldHide;

    updateBalanceVisibilityIcon();
    animateBalance();

}


/* ========================================
   BAKİYE GİZLE / GÖSTER
======================================== */

if (balanceVisibilityButton) {

    balanceVisibilityButton.addEventListener(
        "click",
        () => {

            appState.settings.hideBalance =
                !appState.settings.hideBalance;

            appState.balanceVisible =
                !appState.settings.hideBalance;

            saveSettings();

            updateDashboardBalance();
            renderDashboardMonthlyAndExpenses();

            if (hideBalanceSetting) {
                hideBalanceSetting.checked =
                    appState.settings.hideBalance;
            }

            balanceVisibilityButton.setAttribute(
                "aria-label",
                appState.settings.hideBalance
                    ? "Bakiyeyi göster"
                    : "Bakiyeyi gizle"
            );

        }
    );

}


function applyBalanceVisibility() {

    updateDashboardBalance();
            renderDashboardMonthlyAndExpenses();

    const shouldHide =
        appState.settings?.hideBalance === true;

    [
        profileTotalIncome,
        profileTotalExpense,
        profileTotalNet
    ].forEach((element) => {

        if (!element) {
            return;
        }

        if (shouldHide) {
            element.textContent = "••••••";
        } else {
            renderProfileStats();
        }

    });

    if (hideBalanceSetting) {
        hideBalanceSetting.checked = shouldHide;
    }

    updateBalanceVisibilityIcon();

}


/* ========================================
   KATEGORİ İSİMLERİ
======================================== */

const categoryNames = {

    salary: "Maaş",

    market: "Market",

    bills: "Faturalar",

    food: "Yemek",

    transport: "Ulaşım",

    entertainment: "Eğlence",

    shopping: "Alışveriş",

    other: "Diğer"

};


/* ========================================
   HESAP İSİMLERİ
======================================== */

const accountNames = {

    cash: "Nakit",

    bank: "Banka",

    "credit-card": "Kredi Kartı"

};


/* ========================================
   İŞLEM LİSTESİ
======================================== */

function renderTransactions() {

    if (!transactionsList) {
        return;
    }


    transactionsList.innerHTML = "";


    const transactions =
        [...appState.transactions]
            .sort(
                (a, b) =>
                    getTransactionTimestamp(b) -
                    getTransactionTimestamp(a)
            )
            .slice(0, 10);


    if (transactions.length === 0) {

        transactionsList.innerHTML = `
            <div class="empty-state" id="transactions-empty-state">
                <div class="empty-state-icon">+</div>
                <strong>Henüz işlem yok</strong>
                <span>İlk gelir veya gider işlemini ekleyerek başlayabilirsin.</span>
                <button type="button" class="primary-button" id="empty-add-transaction">İlk İşlemi Ekle</button>
            </div>
        `;

        document
            .querySelector("#empty-add-transaction")
            ?.addEventListener("click", () => openTransactionModal("income"));

        return;

    }


    transactions.forEach(
        (transaction) => {

            const item =
                createTransactionElement(
                    transaction
                );


            transactionsList.appendChild(
                item
            );

        }
    );

}


/* ========================================
   FİLTRELENMİŞ İŞLEMLER
======================================== */

function getFilteredTransactions() {

    const filters =
        appState.transactionFilters;

    let transactions =
        [...appState.transactions];

    if (filters.type !== "all") {

        transactions =
            transactions.filter(
                (transaction) =>
                    transaction.type === filters.type
            );

    }

    if (filters.category !== "all") {

        transactions =
            transactions.filter(
                (transaction) =>
                    transaction.category === filters.category
            );

    }

    if (filters.search.trim()) {

        const search =
            filters.search
                .trim()
                .toLocaleLowerCase("tr-TR");

        transactions =
            transactions.filter(
                (transaction) => {

                    const description =
                        String(transaction.description || "")
                            .toLocaleLowerCase("tr-TR");

                    const category =
                        String(
                            categoryNames[transaction.category] || ""
                        )
                            .toLocaleLowerCase("tr-TR");

                    const amount =
                        String(transaction.amount ?? "");

                    return (
                        description.includes(search) ||
                        category.includes(search) ||
                        amount.includes(search)
                    );

                }
            );

    }

    switch (filters.sort) {

        case "date-asc":

            transactions.sort(
                (a, b) =>
                    new Date(`${a.date || ""}T12:00:00`) -
                    new Date(`${b.date || ""}T12:00:00`)
            );

            break;

        case "amount-desc":

            transactions.sort(
                (a, b) => Number(b.amount) - Number(a.amount)
            );

            break;

        case "amount-asc":

            transactions.sort(
                (a, b) => Number(a.amount) - Number(b.amount)
            );

            break;

        case "date-desc":
        default:

            transactions.sort(
                (a, b) =>
                    new Date(`${b.date || ""}T12:00:00`) -
                    new Date(`${a.date || ""}T12:00:00`)
            );

            break;

    }

    return transactions;

}


/* ========================================
   TÜM İŞLEMLERİ RENDER ET
======================================== */

function renderAllTransactions() {

    if (!allTransactionsList) {
        return;
    }

    const transactions =
        getFilteredTransactions();

    allTransactionsList.innerHTML = "";

    if (resultCount) {
        resultCount.textContent = `${transactions.length} işlem`;
    }

    const currentMonthKey = getCurrentMonthKey();
    const currentMonthTransactions = getMonthlyTransactions(currentMonthKey);
    const currentMonthSummary = calculateAnalyticsSummary(currentMonthTransactions);

    if (txMonthLabel) {
        const [year, month] = currentMonthKey.split("-");
        txMonthLabel.textContent = `${monthNames[Number(month) - 1]} ${year}`;
    }
    if (txMonthIncome) txMonthIncome.textContent = displayAmount(currentMonthSummary.income);
    if (txMonthExpense) txMonthExpense.textContent = displayAmount(currentMonthSummary.expense);

    if (transactions.length === 0) {

        allTransactionsList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">⌕</div>
                <strong>İşlem bulunamadı</strong>
                <span>Arama veya filtrelerini değiştirmeyi deneyebilirsin.</span>
            </div>
        `;

        return;

    }

    let lastDate = null;
    transactions.forEach((transaction) => {
        const dateKey = String(transaction.date || "");
        if (dateKey !== lastDate) {
            const heading = document.createElement("div");
            heading.className = "transaction-date-group";
            const date = new Date(`${dateKey}T12:00:00`);
            heading.innerHTML = `<span>${escapeHtml(formatTransactionDate(dateKey))}</span><i></i>`;
            allTransactionsList.appendChild(heading);
            lastDate = dateKey;
        }
        allTransactionsList.appendChild(createTransactionElement(transaction));
    });

}


/* ========================================
   İŞLEM ELEMENTİ OLUŞTUR
======================================== */

function createTransactionElement(
    transaction
) {

    const article =
        document.createElement(
            "article"
        );

    article.className =
        "transaction-item";

    article.dataset.id =
        transaction.id;

    const isIncome =
        transaction.type ===
        "income";

    const isTransfer =
        transaction.type ===
        "transfer";

    const sign =
        isTransfer ? "⇄" : isIncome ? "+" : "-";

    const amount =
        Number(
            transaction.amount
        ) || 0;

    const category =
        categoryNames[
            transaction.category
        ] ||
        "Diğer";

    const description =
        transaction.description ||
        category;

    const date =
        formatTransactionDate(
            transaction.date
        );

    article.innerHTML = `

        <div class="transaction-swipe-content">

            <div class="transaction-icon">
                ${isTransfer ? "⇄" : transaction.type === "debt" ? "₺" : isIncome ? "+" : "-"}
            </div>

            <div class="transaction-info">
                <h3>${escapeHtml(description)}</h3>
                <span>${isTransfer
                    ? `${escapeHtml(transaction.fromAccount || transaction.account || "Hesap")} → ${escapeHtml(transaction.toAccount || "Hesap")}`
                    : `${escapeHtml(category)} · ${escapeHtml(date)}`}</span>
            </div>

            <strong class="transaction-amount ${isTransfer ? "transfer" : isIncome ? "income" : "expense"}">
                ${sign} ${displayAmount(amount)}
            </strong>

        </div>

        <div class="transaction-swipe-actions" aria-label="İşlem işlemleri">
            <button type="button" class="swipe-action edit-swipe-action" data-action="edit" aria-label="Düzenle" title="Düzenle">✎</button>
            <button type="button" class="swipe-action delete-swipe-action" data-action="delete" aria-label="Sil" title="Sil">🗑</button>
            <button type="button" class="swipe-action detail-swipe-action" data-action="detail" aria-label="Detay" title="Detay">ⓘ</button>
        </div>

    `;

    return article;

}


/* ========================================
   TARİH FORMATLAMA
======================================== */

function formatTransactionDate(
    dateString
) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(
            `${dateString}T12:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;

    }


    return new Intl.DateTimeFormat(
        "tr-TR",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);

}


/* ========================================
   HTML GÜVENLİĞİ
======================================== */

function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ========================================
   MODAL AÇ
======================================== */

function openTransactionModal(
    type = "income"
) {

    if (!transactionModal) {
        return;
    }

    setTransactionType(type);

    transactionModal.classList.add(
        "active"
    );

    transactionModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

    if (!editingTransactionId) {

        setDefaultTransactionDate();

    }

}


/* ========================================
   MODAL KAPAT
======================================== */

function closeTransactionModal() {

    if (!transactionModal) {
        return;
    }

    transactionModal.classList.remove(
        "active"
    );

    transactionModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    if (transactionForm) {

        transactionForm.reset();

    }

    editingTransactionId =
        null;

    const modalTitle =
        document.querySelector(
            "#transaction-modal-title"
        );

    if (modalTitle) {

        modalTitle.textContent =
            "İşlem Ekle";

    }

    setTransactionType(
        "income"
    );

    setDefaultTransactionDate();

}


/* ========================================
   MODAL KAPATMA
======================================== */

if (transactionModalClose) {

    transactionModalClose.addEventListener(
        "click",
        closeTransactionModal
    );

}


if (transactionModalCancel) {

    transactionModalCancel.addEventListener(
        "click",
        closeTransactionModal
    );

}


/* ========================================
   MODAL DIŞINA TIKLAMA
======================================== */

if (transactionModal) {

    transactionModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                transactionModal
            ) {

                closeTransactionModal();

            }

        }
    );

}


/* ========================================
   ESC
======================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            transactionModal?.classList.contains(
                "active"
            )
        ) {

            closeTransactionModal();

        }


        if (
            event.key === "Escape" &&
            deleteConfirmation?.classList.contains(
                "active"
            )
        ) {

            closeDeleteConfirmation();

        }

    }
);


/* ========================================
   İŞLEM TİPİ
======================================== */

function setTransactionType(type) {

    appState.activeTransactionType =
        type;


    transactionTypeButtons.forEach(
        (button) => {

            button.classList.toggle(
                "active",
                button.dataset.type ===
                type
            );

        }
    );

}


transactionTypeButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                if (button.dataset.type === "debt") {
                    closeTransactionModal();
                    switchPage("Borç / Alacak");
                    return;
                }

                setTransactionType(
                    button.dataset.type
                );

            }
        );

    }
);


/* ========================================
   TARİH
======================================== */

function setDefaultTransactionDate() {

    if (!transactionDate) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    transactionDate.value =
        `${year}-${month}-${day}`;

}


/* ========================================
   ALT NAVİGASYON
======================================== */

navigationItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                if (
                    item.classList.contains(
                        "nav-add-button"
                    )
                ) {

                    openTransactionModal();

                    return;

                }


                navigationItems.forEach(
                    (navItem) => {

                        navItem.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );


                const label =
                    item.querySelector(
                        ".nav-label"
                    );


                if (!label) {
                    return;
                }


                appState.activeNavigation =
                    label.textContent.trim();


                switchPage(
                    appState.activeNavigation
                );



            }
        );

    }
);


/* ========================================
   HIZLI İŞLEMLER
======================================== */

quickActionButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const label =
                    button
                        .querySelector(
                            ".quick-action-label"
                        )
                        ?.textContent
                        .trim();


                if (!label) {
                    return;
                }


                switch (label) {

                    case "Gelir Ekle":

                        openTransactionModal(
                            "income"
                        );

                        break;


                    case "Gider Ekle":

                        openTransactionModal(
                            "expense"
                        );

                        break;


                    case "Transfer":

                        openTransactionModal(
                            "transfer"
                        );

                        break;


                    case "Borç / Alacak":

                        switchPage("Borç / Alacak");

                        break;

                }

            }
        );

    }
);


/* ========================================
   FORM SUBMIT
======================================== */

if (transactionForm) {

    transactionForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            try {

                const formData =
                    new FormData(transactionForm);

                const description =
                    String(formData.get("description") || "").trim();

                const category =
                    String(formData.get("category") || "").trim();

                const date =
                    String(formData.get("date") || "").trim();

                const account =
                    String(formData.get("account") || "").trim();

                const amount =
                    Number(formData.get("amount"));

                if (!Number.isFinite(amount) || amount <= 0) {
                    showToast("Lütfen geçerli bir tutar gir.", "error");
                    return;
                }

                if (!description) {
                    showToast("Açıklama gir.", "error");
                    return;
                }

                if (!category) {
                    showToast("Kategori seç.", "error");
                    return;
                }

                if (!date) {
                    showToast("Tarih seç.", "error");
                    return;
                }

                if (!account) {
                    showToast("Hesap seç.", "error");
                    return;
                }

                const type =
                    appState.activeTransactionType;

                if (!["income", "expense", "transfer", "debt"].includes(type)) {
                    showToast("Geçersiz işlem türü.", "error");
                    return;
                }

                if (editingTransactionId) {

                    const transaction =
                        findTransactionById(editingTransactionId);

                    if (!transaction) {
                        showToast("İşlem bulunamadı.", "error");
                        return;
                    }

                    transaction.type = type;
                    transaction.amount = amount;
                    const categoryMeta = window.FixFinansProfileManagement?.getCategories?.().find(item => item.id === category);
                    const accountMeta = window.FixFinansProfileManagement?.getAccounts?.().find(item => item.id === account);
                    transaction.categoryId = categoryMeta?.id || transaction.categoryId || category;
                    transaction.accountId = accountMeta?.id || transaction.accountId || account;
                    transaction.category = categoryMeta?.name || category;
                    transaction.description = description;
                    transaction.date = date;
                    transaction.account = accountMeta?.name || account;

                    if (!validateTransaction(transaction)) {
                        showToast("İşlem bilgileri geçersiz.", "error");
                        return;
                    }

                    saveTransactions();
                    refreshAllViews();
                    closeTransactionModal();
                    showToast("İşlem başarıyla güncellendi.", "success");
                    return;
                }

                const transaction = {
                    id: createTransactionId(),
                    type,
                    amount,
                    category: window.FixFinansProfileManagement?.getCategories?.().find(item => item.id === category)?.name || category,
                    categoryId: category,
                    description,
                    date,
                    account: window.FixFinansProfileManagement?.getAccounts?.().find(item => item.id === account)?.name || account,
                    accountId: account,
                    createdAt: new Date().toISOString()
                };

                if (!validateTransaction(transaction)) {
                    showToast("İşlem bilgileri geçersiz.", "error");
                    return;
                }

                appState.transactions.unshift(transaction);

                saveTransactions();
                refreshAllViews();
                closeTransactionModal();

                showToast(
                    transaction.type === "income"
                        ? "Gelir başarıyla eklendi."
                        : transaction.type === "expense"
                            ? "Gider başarıyla eklendi."
                            : transaction.type === "transfer"
                                ? "Transfer başarıyla eklendi."
                                : "Borç / alacak başarıyla eklendi.",
                    "success"
                );

            } catch (error) {

                console.error("İşlem eklenemedi:", error);
                showToast("İşlem sırasında bir hata oluştu.", "error");

            }

        }
    );

}


/* ========================================
   İŞLEM DÜZENLEME / SİLME
======================================== */

let editingTransactionId =
    null;

let deletingTransactionId =
    null;

const deleteConfirmation =
    document.querySelector(
        "#delete-confirmation"
    );

const deleteCancel =
    document.querySelector(
        "#delete-cancel"
    );

const deleteConfirm =
    document.querySelector(
        "#delete-confirm"
    );


function findTransactionById(id) {

    return appState.transactions.find(
        (transaction) =>
            transaction.id === id
    );

}


function closeAllTransactionMenus() {

    document
        .querySelectorAll(
            ".transaction-menu.active"
        )
        .forEach(
            (menu) => {

                menu.classList.remove(
                    "active"
                );

                const menuButton =
                    menu.parentElement?.querySelector(
                        ".transaction-menu-button"
                    );

                menuButton?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

}


function handleTransactionListClick(event) {

    const button =
        event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const article =
        button.closest(".transaction-item");

    if (!article) {
        return;
    }

    const transactionId =
        article.dataset.id;

    const action =
        button.dataset.action;

    if (action === "menu") {

        const menu =
            article.querySelector(".transaction-menu");

        if (!menu) {
            return;
        }

        const wasActive =
            menu.classList.contains("active");

        closeAllTransactionMenus();

        if (!wasActive) {
            menu.classList.add("active");
            button.setAttribute("aria-expanded", "true");
        }

        return;

    }

    if (action === "edit") {
        closeAllTransactionMenus();
        editTransaction(transactionId);
        return;
    }

    if (action === "delete") {
        closeAllTransactionMenus();
        openDeleteConfirmation(transactionId);
    }

}


if (transactionsList) {
    transactionsList.addEventListener(
        "click",
        handleTransactionListClick
    );
}


if (allTransactionsList) {
    allTransactionsList.addEventListener(
        "click",
        handleTransactionListClick
    );
}


document.addEventListener(
    "click",
    (event) => {

        if (
            !event.target.closest(
                ".transaction-actions"
            )
        ) {

            closeAllTransactionMenus();

        }

    }
);


function editTransaction(id) {

    const transaction =
        findTransactionById(id);

    if (!transaction) {

        console.error(
            "İşlem bulunamadı."
        );

        return;

    }

    editingTransactionId =
        id;

    setTransactionType(
        transaction.type
    );

    const amountInput =
        document.querySelector(
            "#transaction-amount"
        );

    const categoryInput =
        document.querySelector(
            "#transaction-category"
        );

    const descriptionInput =
        document.querySelector(
            "#transaction-description"
        );

    const dateInput =
        document.querySelector(
            "#transaction-date"
        );

    const accountInput =
        document.querySelector(
            "#transaction-account"
        );

    if (amountInput) {
        amountInput.value =
            transaction.amount;
    }

    if (categoryInput) {
        categoryInput.value =
            transaction.category;
    }

    if (descriptionInput) {
        descriptionInput.value =
            transaction.description || "";
    }

    if (dateInput) {
        dateInput.value =
            transaction.date;
    }

    if (accountInput) {
        accountInput.value =
            transaction.account;
    }

    const modalTitle =
        document.querySelector(
            "#transaction-modal-title"
        );

    if (modalTitle) {
        modalTitle.textContent =
            "İşlemi Düzenle";
    }

    openTransactionModal(
        transaction.type
    );

}


function openDeleteConfirmation(id) {

    const transaction =
        findTransactionById(id);

    if (!transaction) {
        return;
    }

    deletingTransactionId =
        id;

    deleteConfirmation?.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeDeleteConfirmation() {

    deletingTransactionId =
        null;

    deleteConfirmation?.classList.remove(
        "active"
    );

    if (
        !transactionModal?.classList.contains(
            "active"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


if (deleteCancel) {

    deleteCancel.addEventListener(
        "click",
        closeDeleteConfirmation
    );

}


if (deleteConfirm) {

    deleteConfirm.addEventListener(
        "click",
        () => {

            if (!deletingTransactionId) {
                return;
            }

            const deletedId =
                deletingTransactionId;

            appState.transactions =
                appState.transactions.filter(
                    (transaction) =>
                        transaction.id !==
                        deletedId
                );

            saveTransactions();

            renderTransactions();

            renderAllTransactions();

            updateDashboardBalance();
            renderDashboardMonthlyAndExpenses();

            renderAnalytics();

            renderProfileStats();

            closeDeleteConfirmation();
            showToast("İşlem başarıyla silindi.", "success");


        }
    );

}


if (deleteConfirmation) {

    deleteConfirmation.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                deleteConfirmation
            ) {

                closeDeleteConfirmation();

            }

        }
    );

}


/* ========================================
   İŞLEMLER SAYFASI — FİLTRELER
======================================== */

filterChips.forEach(
    (chip) => {

        chip.addEventListener(
            "click",
            () => {

                filterChips.forEach(
                    (item) => item.classList.remove("active")
                );

                chip.classList.add("active");

                appState.transactionFilters.type =
                    chip.dataset.filterType || "all";

                renderAllTransactions();

            }
        );

    }
);


function debounce(callback, delay = 250) {

    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };

}

const debouncedTransactionSearch = debounce(() => {

    appState.transactionFilters.search =
        transactionSearch?.value || "";

    searchClear?.classList.toggle(
        "active",
        Boolean(transactionSearch?.value)
    );

    renderAllTransactions();

}, 250);

if (transactionSearch) {
    transactionSearch.addEventListener("input", debouncedTransactionSearch);
}


if (searchClear) {

    searchClear.addEventListener(
        "click",
        () => {

            if (transactionSearch) {
                transactionSearch.value = "";
            }

            appState.transactionFilters.search = "";
            searchClear.classList.remove("active");
            renderAllTransactions();
            transactionSearch?.focus();

        }
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        () => {

            appState.transactionFilters.category =
                categoryFilter.value;

            renderAllTransactions();

        }
    );

}


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        () => {

            appState.transactionFilters.sort =
                sortSelect.value;

            renderAllTransactions();

        }
    );

}



/* ========================================
   AŞAMA 9 — ANALİZ SİSTEMİ
======================================== */

const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

function getMonthKey(date) {
    if (!date) return null;
    const parsed = new Date(`${date}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return null;
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}`;
}

function getCurrentMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function initializeAnalyticsMonths() {
    if (!analyticsMonth) return;

    const months = new Set();
    appState.transactions.forEach((transaction) => {
        const month = getMonthKey(transaction.date);
        if (month) months.add(month);
    });

    const currentMonth = getCurrentMonthKey();
    months.add(currentMonth);

    const sortedMonths = [...months].sort((a, b) => b.localeCompare(a));
    const previousSelection = appState.analyticsMonth;

    analyticsMonth.innerHTML = "";

    sortedMonths.forEach((monthKey) => {
        const [year, month] = monthKey.split("-");
        const option = document.createElement("option");
        option.value = monthKey;
        option.textContent = `${monthNames[Number(month) - 1]} ${year}`;
        analyticsMonth.appendChild(option);
    });

    const selectedMonth = previousSelection && months.has(previousSelection)
        ? previousSelection
        : (months.has(currentMonth) ? currentMonth : sortedMonths[0]);

    appState.analyticsMonth = selectedMonth || null;
    if (selectedMonth) analyticsMonth.value = selectedMonth;
}

function getMonthlyTransactions(monthKey) {
    return appState.transactions.filter(
        (transaction) => getMonthKey(transaction.date) === monthKey
    );
}

function calculateAnalyticsSummary(transactions) {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;
        if (transaction.type === "income") income += amount;
        if (transaction.type === "expense") expense += amount;
    });

    const net = income - expense;
    const savingRate = income > 0 ? (net / income) * 100 : 0;

    return { income, expense, net, savingRate };
}

function getPreviousMonthKey(monthKey) {
    if (!monthKey) return null;
    const [year, month] = monthKey.split("-").map(Number);
    const date = new Date(year, month - 2, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function calculatePercentageChange(current, previous) {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / Math.abs(previous)) * 100;
}

function formatChange(value) {
    if (value === 0) return "Değişim yok";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
}


function renderDashboardMonthlyChart() {
    if (!dashboardMonthlyChart) {
        return;
    }

    const monthKey = getCurrentMonthKey();
    const summary = calculateAnalyticsSummary(
        getMonthlyTransactions(monthKey)
    );

    dashboardMonthlyChart.innerHTML = "";

    if (summary.income === 0 && summary.expense === 0) {
        dashboardMonthlyChart.innerHTML =
            '<div class="chart-empty">Bu ay için yeterli veri yok.</div>';
        return;
    }

    const maxValue = Math.max(
        summary.income,
        summary.expense,
        1
    );

    const column = document.createElement("div");
    column.className = "chart-column";

    const incomeBar = document.createElement("div");
    incomeBar.className = "chart-bar income";
    incomeBar.style.height =
        `${Math.max((summary.income / maxValue) * 100, summary.income > 0 ? 3 : 0)}%`;

    const expenseBar = document.createElement("div");
    expenseBar.className = "chart-bar expense";
    expenseBar.style.height =
        `${Math.max((summary.expense / maxValue) * 100, summary.expense > 0 ? 3 : 0)}%`;

    const monthLabel = document.createElement("span");
    monthLabel.className = "chart-month";
    const [, month] = monthKey.split("-");
    monthLabel.textContent =
        monthNames[Number(month) - 1] || "";

    column.appendChild(incomeBar);
    column.appendChild(expenseBar);
    column.appendChild(monthLabel);
    dashboardMonthlyChart.appendChild(column);
}


function renderDashboardMonthlyAndExpenses() {
    const monthKey = getCurrentMonthKey();
    const transactions = getMonthlyTransactions(monthKey);
    const current = calculateAnalyticsSummary(transactions);
    const previous = calculateAnalyticsSummary(
        getMonthlyTransactions(getPreviousMonthKey(monthKey))
    );
    const shouldHide = appState.settings?.hideBalance === true;

    if (dashboardMonthlyIncome) {
        dashboardMonthlyIncome.textContent = shouldHide
            ? "••••••"
            : `+ ${formatCurrency(current.income)}`;
    }

    if (dashboardMonthlyExpense) {
        dashboardMonthlyExpense.textContent = shouldHide
            ? "••••••"
            : `- ${formatCurrency(current.expense)}`;
    }

    if (dashboardMonthlyNet) {
        dashboardMonthlyNet.textContent = shouldHide
            ? "••••••"
            : formatCurrency(current.net);
    }

    if (dashboardMonthlyChange) {
        const change = calculatePercentageChange(
            current.net,
            previous.net
        );
        dashboardMonthlyChange.textContent =
            change === 0
                ? "Değişim yok"
                : `${change > 0 ? "↑" : "↓"} %${Math.abs(change).toFixed(1)}`;
    }

    renderDashboardMonthlyChart();

    if (!dashboardExpenseChart || !dashboardExpenseCategories) {
        return;
    }

    const categoryEntries = Object.entries(
        calculateCategoryExpenses(transactions)
    )
        .filter(([, value]) => Number(value) > 0)
        .sort((a, b) => b[1] - a[1]);

    const totalExpense = categoryEntries.reduce(
        (sum, [, value]) => sum + Number(value),
        0
    );

    const chartColors = [
        "#00A8FF", "#2563EB", "#38BDF8", "#64748B",
        "#818CF8", "#334155", "#22C55E", "#A855F7"
    ];

    if (!categoryEntries.length || totalExpense <= 0) {
        dashboardExpenseChart.style.background =
            "conic-gradient(#263247 0deg 360deg)";
        dashboardExpenseCategories.innerHTML =
            '<div class="chart-empty">Bu ay henüz gider yok.</div>';
        return;
    }

    let currentDegree = 0;
    const gradients = [];

    categoryEntries.forEach(([category, value], index) => {
        const degrees = (Number(value) / totalExpense) * 360;
        const end = currentDegree + degrees;
        const color = chartColors[index % chartColors.length];

        gradients.push(`${color} ${currentDegree}deg ${end}deg`);
        currentDegree = end;
    });

    dashboardExpenseChart.style.background =
        `conic-gradient(${gradients.join(",")})`;

    dashboardExpenseCategories.innerHTML = "";

    categoryEntries.forEach(([category, value], index) => {
        const percentage =
            (Number(value) / totalExpense) * 100;

        const item = document.createElement("div");
        item.className = "expense-category";

        const name = categoryNames[category] || "Diğer";

        item.innerHTML = `
            <span>${escapeHtml(name)}</span>
            <strong>${percentage.toFixed(0)}%</strong>
        `;

        dashboardExpenseCategories.appendChild(item);
    });
}

function getAnalyticsTransactions() {
    if (!appState.analyticsMonth) return [];
    const key = appState.analyticsMonth;
    if (appState.reportPeriod === "yearly") {
        const year = Number(key.split("-")[0]);
        return appState.transactions.filter((transaction) => {
            const date = String(transaction.date || "");
            return Number(date.slice(0, 4)) === year;
        });
    }
    if (appState.reportPeriod === "quarterly") {
        const [year, month] = key.split("-").map(Number);
        const base = new Date(year, month - 1, 1);
        const keys = [];
        for (let i = 2; i >= 0; i--) {
            const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
            keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
        }
        return appState.transactions.filter((transaction) => keys.includes(String(transaction.date || "").slice(0, 7)));
    }
    return getMonthlyTransactions(key);
}

function getAnalyticsPeriodLabel() {
    if (!appState.analyticsMonth) return "Dönem";
    const [year, month] = appState.analyticsMonth.split("-").map(Number);
    if (appState.reportPeriod === "yearly") return `${year} yılı`;
    if (appState.reportPeriod === "quarterly") {
        const start = new Date(year, month - 3, 1);
        const end = new Date(year, month - 1, 1);
        return `${monthNames[start.getMonth()]} – ${monthNames[end.getMonth()]} ${end.getFullYear()}`;
    }
    return `${monthNames[month - 1]} ${year}`;
}

function renderAnalyticsSummary() {
    if (!appState.analyticsMonth) return;

    const current = calculateAnalyticsSummary(getAnalyticsTransactions());
    let previousTransactions = [];
    if (appState.reportPeriod === "monthly") {
        previousTransactions = getMonthlyTransactions(getPreviousMonthKey(appState.analyticsMonth));
    } else if (appState.reportPeriod === "quarterly") {
        const [year, month] = appState.analyticsMonth.split("-").map(Number);
        const previousKey = new Date(year, month - 4, 1);
        const keys = [];
        for (let i = 2; i >= 0; i--) {
            const d = new Date(previousKey.getFullYear(), previousKey.getMonth() - i, 1);
            keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
        }
        previousTransactions = appState.transactions.filter((transaction) => keys.includes(String(transaction.date || "").slice(0, 7)));
    } else {
        const year = Number(appState.analyticsMonth.split("-")[0]) - 1;
        previousTransactions = appState.transactions.filter((transaction) => String(transaction.date || "").slice(0, 4) === String(year));
    }
    const previous = calculateAnalyticsSummary(previousTransactions);

    const reportLabel = document.querySelector(".analytics-period-label");
    if (reportLabel) reportLabel.textContent = getAnalyticsPeriodLabel();
    if (analyticsIncome) analyticsIncome.textContent = displayAmount(current.income);
    if (analyticsExpense) analyticsExpense.textContent = displayAmount(current.expense);
    if (analyticsNet) analyticsNet.textContent = displayAmount(current.net);
    if (analyticsSavingRate) {
        analyticsSavingRate.textContent = `Tasarruf %${Math.max(0, current.savingRate).toFixed(1)}`;
    }

    if (analyticsIncomeChange) {
        analyticsIncomeChange.textContent = `Önceki aya göre ${formatChange(
            calculatePercentageChange(current.income, previous.income)
        )}`;
    }

    if (analyticsExpenseChange) {
        analyticsExpenseChange.textContent = `Önceki aya göre ${formatChange(
            calculatePercentageChange(current.expense, previous.expense)
        )}`;
    }
}

function calculateCategoryExpenses(transactions) {
    const categories = {};
    transactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;
        const category = transaction.category || "other";
        const amount = Number(transaction.amount) || 0;
        categories[category] = (categories[category] || 0) + amount;
    });
    return categories;
}

function renderExpenseDonut() {
    if (!expenseDonut || !categoryLegend || !appState.analyticsMonth) return;

    const entries = Object.entries(
        calculateCategoryExpenses(getAnalyticsTransactions())
    ).sort((a, b) => b[1] - a[1]);

    const total = entries.reduce((sum, [, value]) => sum + value, 0);
    if (donutTotal) donutTotal.textContent = displayAmount(total);

    if (!entries.length) {
        expenseDonut.style.background = "conic-gradient(#263247 0deg 360deg)";
        categoryLegend.innerHTML = `<div class="chart-empty">Bu ay henüz gider yok.</div>`;
        return;
    }

    const chartColors = [
        "#00A8FF", "#22C55E", "#EF4444", "#A855F7",
        "#F59E0B", "#06B6D4", "#EC4899", "#94A3B8"
    ];

    let currentDegree = 0;
    const gradients = [];

    entries.forEach(([category, value], index) => {
        const degrees = (value / total) * 360;
        const start = currentDegree;
        const end = currentDegree + degrees;
        const color = chartColors[index % chartColors.length];
        gradients.push(`${color} ${start}deg ${end}deg`);
        currentDegree = end;
    });

    expenseDonut.style.background = `conic-gradient(${gradients.join(",")})`;
    categoryLegend.innerHTML = "";

    entries.forEach(([category, value], index) => {
        const percentage = (value / total) * 100;
        const color = chartColors[index % chartColors.length];
        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `
            <span class="legend-dot" style="background:${color}"></span>
            <span class="legend-name">${escapeHtml(categoryNames[category] || "Diğer")}</span>
            <span class="legend-value">${percentage.toFixed(0)}%</span>
        `;
        categoryLegend.appendChild(item);
    });
}

function renderAnalyticsHighlights() {
    if (!appState.analyticsMonth) return;

    const transactions = getAnalyticsTransactions();
    const expenses = transactions.filter((transaction) => transaction.type === "expense");
    const incomes = transactions.filter((transaction) => transaction.type === "income");

    const categoryEntries = Object.entries(calculateCategoryExpenses(transactions))
        .sort((a, b) => b[1] - a[1]);

    if (categoryEntries.length) {
        const [category, value] = categoryEntries[0];
        if (topExpenseCategory) topExpenseCategory.textContent = categoryNames[category] || "Diğer";
        if (topExpenseCategoryValue) topExpenseCategoryValue.textContent = displayAmount(value);
    } else {
        if (topExpenseCategory) topExpenseCategory.textContent = "—";
        if (topExpenseCategoryValue) topExpenseCategoryValue.textContent = displayAmount(0);
    }

    const highestExpenseTransaction = [...expenses].sort(
        (a, b) => Number(b.amount) - Number(a.amount)
    )[0];

    if (highestExpenseTransaction) {
        if (highestExpense) {
            highestExpense.textContent = highestExpenseTransaction.description ||
                categoryNames[highestExpenseTransaction.category] || "Gider";
        }
        if (highestExpenseValue) {
            highestExpenseValue.textContent = displayAmount(Number(highestExpenseTransaction.amount));
        }
    } else {
        if (highestExpense) highestExpense.textContent = "—";
        if (highestExpenseValue) highestExpenseValue.textContent = displayAmount(0);
    }

    const highestIncomeTransaction = [...incomes].sort(
        (a, b) => Number(b.amount) - Number(a.amount)
    )[0];

    if (highestIncomeTransaction) {
        if (highestIncome) {
            highestIncome.textContent = highestIncomeTransaction.description ||
                categoryNames[highestIncomeTransaction.category] || "Gelir";
        }
        if (highestIncomeValue) {
            highestIncomeValue.textContent = displayAmount(Number(highestIncomeTransaction.amount));
        }
    } else {
        if (highestIncome) highestIncome.textContent = "—";
        if (highestIncomeValue) highestIncomeValue.textContent = displayAmount(0);
    }

    if (analyticsTransactionCount) analyticsTransactionCount.textContent = transactions.length;
}

function renderMonthlyChart() {
    if (!monthlyChart || !appState.analyticsMonth) return;
    const [year, month] = appState.analyticsMonth.split("-").map(Number);
    let points = [];
    if (appState.reportPeriod === "monthly") {
        const summary = calculateAnalyticsSummary(getMonthlyTransactions(appState.analyticsMonth));
        points = [{ label: monthNames[month - 1].substring(0, 3), income: summary.income, expense: summary.expense }];
    } else if (appState.reportPeriod === "quarterly") {
        for (let i = 2; i >= 0; i--) {
            const d = new Date(year, month - 1 - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const summary = calculateAnalyticsSummary(getMonthlyTransactions(key));
            points.push({ label: monthNames[d.getMonth()].substring(0, 3), income: summary.income, expense: summary.expense });
        }
    } else {
        for (let m = 1; m <= 12; m++) {
            const key = `${year}-${String(m).padStart(2, "0")}`;
            const summary = calculateAnalyticsSummary(getMonthlyTransactions(key));
            points.push({ label: monthNames[m - 1].substring(0, 3), income: summary.income, expense: summary.expense });
        }
    }
    const maxValue = Math.max(...points.map((p) => Math.max(p.income, p.expense)), 1);
    monthlyChart.innerHTML = "";
    points.forEach((point) => {
        const column = document.createElement("div");
        column.className = "chart-column";
        const incomeBar = document.createElement("div");
        incomeBar.className = "chart-bar income";
        incomeBar.style.height = `${Math.max(3, (point.income / maxValue) * 100)}%`;
        const expenseBar = document.createElement("div");
        expenseBar.className = "chart-bar expense";
        expenseBar.style.height = `${Math.max(3, (point.expense / maxValue) * 100)}%`;
        const monthLabel = document.createElement("span");
        monthLabel.className = "chart-month";
        monthLabel.textContent = point.label;
        column.append(incomeBar, expenseBar, monthLabel);
        monthlyChart.appendChild(column);
    });
}

function renderYearlyChart() {
    if (!yearlyChart || !appState.analyticsMonth) return;

    const selectedYear = Number(appState.analyticsMonth.split("-")[0]);
    if (!selectedYear) return;

    const monthlyData = [];
    for (let month = 1; month <= 12; month++) {
        const key = `${selectedYear}-${String(month).padStart(2, "0")}`;
        const summary = calculateAnalyticsSummary(getMonthlyTransactions(key));
        monthlyData.push({ month, income: summary.income, expense: summary.expense });
    }

    const maxValue = Math.max(
        ...monthlyData.map((item) => Math.max(item.income, item.expense)),
        1
    );

    yearlyChart.innerHTML = "";

    monthlyData.forEach((item) => {
        const column = document.createElement("div");
        column.className = "year-column";

        const bars = document.createElement("div");
        bars.className = "year-bars";

        const incomeBar = document.createElement("div");
        incomeBar.className = "year-bar income";
        incomeBar.style.height = `${(item.income / maxValue) * 100}%`;

        const expenseBar = document.createElement("div");
        expenseBar.className = "year-bar expense";
        expenseBar.style.height = `${(item.expense / maxValue) * 100}%`;

        const label = document.createElement("span");
        label.className = "year-label";
        label.textContent = monthNames[item.month - 1].substring(0, 3);

        bars.appendChild(incomeBar);
        bars.appendChild(expenseBar);
        column.appendChild(bars);
        column.appendChild(label);
        yearlyChart.appendChild(column);
    });
}

function renderAnalytics() {
    if (!appState.analyticsMonth) initializeAnalyticsMonths();
    renderAnalyticsSummary();
    renderExpenseDonut();
    renderAnalyticsHighlights();
    renderMonthlyChart();
    renderYearlyChart();
}

if (analyticsMonth) {
    analyticsMonth.addEventListener("change", () => {
        appState.analyticsMonth = analyticsMonth.value;
        renderAnalytics();
    });
}

/* ========================================
   AYARLAR / PROFİL
======================================== */

const SETTINGS_STORAGE_KEY =
    "finans_app_settings";

function loadSettings() {

    try {

        const saved =
            localStorage.getItem(
                SETTINGS_STORAGE_KEY
            );

        if (!saved) {
            return;
        }

        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object") {
            appState.settings =
                normalizeSettings(parsed);
        }

    } catch (error) {
        console.error("Ayarlar yüklenemedi:", error);
    }

}

function saveSettings() {

    try {
        localStorage.setItem(
            SETTINGS_STORAGE_KEY,
            JSON.stringify(appState.settings)
        );
    } catch (error) {
        console.error("Ayarlar kaydedilemedi:", error);
    }

}

function renderSettings() {

    if (currencySetting) {
        currencySetting.value =
            appState.settings.currency;
    }

    if (hideBalanceSetting) {
        hideBalanceSetting.checked =
            appState.settings.hideBalance;
    }

    if (notificationSetting) {
        notificationSetting.checked =
            appState.settings.notifications;
    }

    themeOptions.forEach((option) => {
        option.classList.toggle(
            "active",
            option.dataset.theme ===
                appState.settings.theme
        );
    });

    if (profileName) {
        profileName.textContent =
            appState.settings.name;
    }

    if (profileInfoName) {
        profileInfoName.textContent =
            appState.settings.name;
    }

    if (profileInfoCurrency) {
        profileInfoCurrency.textContent =
            appState.settings.currency;
    }

    if (headerProfileName) {
        headerProfileName.textContent =
            appState.settings.name;
    }

    const profileAvatarLarge =
        document.querySelector("#profile-avatar-large");

    if (headerProfileAvatar) {
        headerProfileAvatar.textContent =
            (appState.settings.name || "İ")
                .trim()
                .charAt(0)
                .toLocaleUpperCase("tr-TR") || "İ";
    }

    if (profileAvatarLarge) {
        profileAvatarLarge.textContent =
            (appState.settings.name || "İ")
                .trim()
                .charAt(0)
                .toLocaleUpperCase("tr-TR") || "İ";
    }

}

function renderProfileStats() {

    let income = 0;
    let expense = 0;

    appState.transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (transaction.type === "income") {
            income += amount;
        }

        if (transaction.type === "expense") {
            expense += amount;
        }
    });

    const net = income - expense;

    if (profileTransactionCount) {
        profileTransactionCount.textContent =
            appState.transactions.length;
    }

    if (profileTotalIncome) {
        profileTotalIncome.textContent =
            displayAmount(income);
    }

    if (profileTotalExpense) {
        profileTotalExpense.textContent =
            displayAmount(expense);
    }

    if (profileTotalNet) {
        profileTotalNet.textContent =
            displayAmount(net);
    }

}

function applyTheme() {

    document.documentElement.dataset.theme =
        appState.settings.theme === "light"
            ? "light"
            : "dark";

}

function refreshAllViews() {

    renderSettings();
    renderTransactions();
    renderAllTransactions();
    renderGoals();

    if (!appState.analyticsMonth) {
        initializeAnalyticsMonths();
    }

    renderAnalytics();
    applyBalanceVisibility();

}

if (currencySetting) {
    currencySetting.addEventListener("change", () => {
        appState.settings.currency =
            currencySetting.value;
        saveSettings();
        refreshAllViews();
    });
}

if (hideBalanceSetting) {
    hideBalanceSetting.addEventListener("change", () => {
        appState.settings.hideBalance =
            hideBalanceSetting.checked;
        appState.balanceVisible =
            !appState.settings.hideBalance;
        saveSettings();
        applyBalanceVisibility();
    });
}

if (notificationSetting) {
    notificationSetting.addEventListener("change", () => {
        appState.settings.notifications =
            notificationSetting.checked;
        saveSettings();
    });
}

themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
        appState.settings.theme =
            option.dataset.theme === "light"
                ? "light"
                : "dark";
        saveSettings();
        applyTheme();
        renderSettings();
    });
});

if (profileEditButton) {
    profileEditButton.addEventListener("click", () => {
        const currentName = appState.settings.name;
        openPremiumInputModal({
            title: "Profil Adını Düzenle", kicker: "Profil", label: "Adınız", value: currentName, submitLabel: "Kaydet",
            onSubmit: (newName, close) => {
                if (!newName || !String(newName).trim()) { showToast("Ad alanı boş bırakılamaz.", "error"); return; }
                appState.settings.name = String(newName).trim().slice(0,60);
                saveSettings(); renderSettings(); renderProfileStats(); close();
                showToast("Profil adı güncellendi.", "success");
            }
        });
    });
}

function exportAppData() {

    const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        transactions: appState.transactions,
        goals: appState.goals,
        settings: appState.settings,
        accounts: window.FixFinansProfileManagement?.getAccounts?.() || [],
        categories: window.FixFinansProfileManagement?.getCategories?.() || []
    };

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
        `finans-yedek-${Date.now()}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Veriler dışa aktarıldı.", "success");

}

if (exportDataButton) {
    exportDataButton.addEventListener(
        "click",
        exportAppData
    );
}

if (importDataButton) {
    importDataButton.addEventListener("click", () => {
        importFileInput?.click();
    });
}

function validateImportedTransaction(transaction) {

    if (!transaction || typeof transaction !== "object") {
        return false;
    }

    if (!["income", "expense", "transfer", "debt"].includes(transaction.type)) {
        return false;
    }

    if (!Number.isFinite(Number(transaction.amount)) || Number(transaction.amount) <= 0) {
        return false;
    }

    if (typeof transaction.description !== "string" || !transaction.description.trim()) {
        return false;
    }

    if (typeof transaction.category !== "string" || !transaction.category.trim()) {
        return false;
    }

    if (typeof transaction.date !== "string" || !transaction.date.trim()) {
        return false;
    }

    return true;

}

if (importFileInput) {
    importFileInput.addEventListener("change", async (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            if (!data || !Array.isArray(data.transactions)) {
                throw new Error("Geçersiz veri dosyası.");
            }

            const validTransactions =
                data.transactions.filter(
                    validateImportedTransaction
                );

            if (validTransactions.length !==
                data.transactions.length) {
                throw new Error(
                    "Dosyada geçersiz işlem bulundu."
                );
            }

            const confirmed = window.confirm(
                "Bu dosyadaki veriler mevcut verilerin yerine yüklenecek. Devam edilsin mi?"
            );

            if (!confirmed) {
                return;
            }

            appState.transactions =
                validTransactions.map((transaction) => ({
                    ...transaction,
                    id: typeof transaction.id === "string" && transaction.id
                        ? transaction.id
                        : createTransactionId(),
                    amount: Number(transaction.amount),
                    description: transaction.description.trim(),
                    category: transaction.category.trim(),
                    date: transaction.date.trim(),
                    createdAt:
                        transaction.createdAt ||
                        `${transaction.date}T12:00:00`
                }));

            if (data.settings &&
                typeof data.settings === "object") {
                appState.settings =
                    normalizeSettings(data.settings);
            }

            if (Array.isArray(data.goals)) {
                const validGoals = data.goals.filter(validateStoredGoal);
                if (validGoals.length !== data.goals.length) {
                    throw new Error("Dosyada geçersiz hedef bulundu.");
                }
                appState.goals = validGoals.map((goal) => ({
                    ...goal,
                    targetAmount: Number(goal.targetAmount),
                    currentAmount: Number(goal.currentAmount),
                    name: goal.name.trim()
                }));
            } else {
                appState.goals = [];
            }

            const importedAccounts = Array.isArray(data.accounts) ? data.accounts : null;
            const importedCategories = Array.isArray(data.categories) ? data.categories : null;
            if (window.FixFinansProfileManagement?.replaceData) {
                window.FixFinansProfileManagement.replaceData(importedAccounts, importedCategories);
            }

            saveTransactions();
            saveGoals();
            saveSettings();

            appState.analyticsMonth = null;
            refreshAllViews();
            applyTheme();

            showToast("Veriler başarıyla içe aktarıldı.", "success");

        } catch (error) {
            console.error("İçe aktarma hatası:", error);
            showToast(
                error.message === "Dosyada geçersiz işlem bulundu."
                    ? error.message
                    : "Dosya okunamadı. Lütfen geçerli bir JSON yedeği seç.",
                "error"
            );
        } finally {
            event.target.value = "";
        }

    });
}

function deleteAllAppData() {

    const firstConfirm = window.confirm(
        "Tüm finans işlemleri ve ayarlar silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musun?"
    );

    if (!firstConfirm) {
        return;
    }

    const secondConfirm = window.confirm(
        "SON UYARI: Tüm veriler kalıcı olarak silinecek. Emin misin?"
    );

    if (!secondConfirm) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    localStorage.removeItem(GOALS_STORAGE_KEY);
    if (window.FixFinansProfileManagement?.clearData) {
        window.FixFinansProfileManagement.clearData();
    } else {
        localStorage.setItem("finance_accounts", "[]");
        localStorage.setItem("finance_categories", "[]");
    }

    appState.transactions = [];
    appState.goals = [];
    appState.settings = {
        ...DEFAULT_SETTINGS
    };
    appState.analyticsMonth = null;
    appState.balanceVisible = true;

    refreshAllViews();
    applyTheme();

    showToast("Tüm veriler silindi.", "success");

}

if (deleteAllDataButton) {
    deleteAllDataButton.addEventListener(
        "click",
        deleteAllAppData
    );
}

function ensureHomeMenu() {
    let menu = document.querySelector("#home-menu-panel");
    if (menu) return menu;

    menu = document.createElement("div");
    menu.id = "home-menu-panel";
    menu.className = "home-menu-panel";
    menu.hidden = true;
    menu.innerHTML = `
        <div class="home-menu-backdrop" data-home-menu-close></div>
        <aside class="home-menu-sheet" role="dialog" aria-modal="true" aria-label="Uygulama menüsü">
            <div class="home-menu-grabber"></div>
            <div class="home-menu-head">
                <div><span class="section-label">Finansal kontrol</span><h2>Menü</h2></div>
                <button type="button" class="modal-close" data-home-menu-close aria-label="Menüyü kapat">×</button>
            </div>
            <nav class="home-menu-nav">
                <button type="button" data-menu-page="Ana Sayfa">⌂<span>Ana Sayfa</span></button>
                <button type="button" data-menu-page="İşlemler">☷<span>İşlemler</span></button>
                <button type="button" data-menu-page="Raporlar">▥<span>Raporlar</span></button>
                <button type="button" data-menu-page="Hedeflerim">◈<span>Hedeflerim</span></button>
                <button type="button" data-menu-page="Profil">◎<span>Profil</span></button>
                <button type="button" data-menu-page="Ayarlar">⚙<span>Ayarlar</span></button>
            </nav>
        </aside>`;
    document.body.appendChild(menu);

    const close = () => {
        menu.hidden = true;
        document.body.classList.remove("modal-open");
    };
    menu.querySelectorAll("[data-home-menu-close]").forEach((el) => el.addEventListener("click", close));
    menu.addEventListener("click", (event) => {
        const item = event.target.closest("[data-menu-page]");
        if (!item) return;
        switchPage(item.dataset.menuPage);
        close();
    });
    menu._open = () => {
        menu.hidden = false;
        document.body.classList.add("modal-open");
    };
    menu._close = close;
    return menu;
}

homeMenuButton?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    ensureHomeMenu()._open();
});

if (notificationButton) {
    notificationButton.addEventListener("click", () => {
        showToast(
            appState.settings.notifications
                ? "Bildirimler açık."
                : "Bildirimler kapalı.",
            appState.settings.notifications ? "success" : "error"
        );
    });
}

if (settingsButton) {
    settingsButton.addEventListener("click", () => {
        switchPage("Ayarlar");
    });
}

if (headerProfileAvatar) {
    headerProfileAvatar.addEventListener("click", () => {
        switchPage("Profil");
    });
}

/* ========================================
   BUTTON MICRO INTERACTION
======================================== */

document.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button || button.disabled) {
        return;
    }

    const ripple = document.createElement("span");
    ripple.className = "button-ripple";
    button.appendChild(ripple);

    window.setTimeout(() => ripple.remove(), 450);

});


/* ========================================
   HEDEFLERİM — AŞAMA 13.1.4
======================================== */

function bindGoalEvents() {
    goalsAddButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openGoalModal();
    });
    goalsBackButton?.addEventListener("click", () => switchPage("Ana Sayfa"));
    goalModalClose?.addEventListener("click", closeGoalModal);
    goalModalCancel?.addEventListener("click", closeGoalModal);
    goalForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        saveGoalFromForm();
    });

    // Hedef kontrolleri dinamik render edildiği için tek merkezden yönetilir.
    document.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;

        const create = target.closest("[data-goal-create]");
        if (create) {
            event.preventDefault();
            event.stopPropagation();
            openGoalModal();
            return;
        }

        const openGoals = target.closest("[data-open-goals]");
        if (openGoals) {
            event.preventDefault();
            switchPage("Hedeflerim");
            return;
        }

        const contribute = target.closest("[data-goal-contribute]");
        if (contribute) {
            event.preventDefault();
            contributeToGoal(contribute.dataset.goalContribute);
            return;
        }

        const remove = target.closest("[data-goal-delete]");
        if (remove) {
            event.preventDefault();
            deleteGoal(remove.dataset.goalDelete);
            return;
        }

        if (target.closest("[data-goal-open]")) {
            event.preventDefault();
            switchPage("Hedeflerim");
        }
    }, true);

    goalModal?.addEventListener("click", (event) => {
        if (event.target === goalModal) closeGoalModal();
    });
}

bindGoalEvents();

/* ========================================
   PREMIUM EKRAN ETKİLEŞİMLERİ
======================================== */

if (transactionsBackButton) {
    transactionsBackButton.addEventListener("click", () => {
        switchPage("Ana Sayfa");
    });
}

if (transactionsFilterButton) {
    transactionsFilterButton.addEventListener("click", () => {
        const page = document.querySelector(".transactions-page");
        if (!page) return;
        const opened = page.classList.toggle("filters-open");
        transactionsFilterButton.setAttribute("aria-expanded", String(opened));
        if (opened) {
            document.querySelector(".transaction-filters")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });
}

document.querySelectorAll(".report-period-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".report-period-tab").forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");
        const period = tab.dataset.reportPeriod;
        appState.reportPeriod = period;
        renderAnalytics();
        const yearlyCard = document.querySelector(".yearly-card");
        if (yearlyCard) yearlyCard.classList.toggle("report-focus", period === "yearly");
        if (period === "yearly") {
            yearlyCard?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else if (period === "monthly") {
            document.querySelector(".category-card")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });
});

/* ========================================
   SAYFA DEĞİŞTİR
======================================== */

function switchPage(pageName) {

    const dashboardSections =
        document.querySelectorAll(".dashboard-section");

    if (transactionsPage) {
        transactionsPage.classList.remove("active");
    }

    if (debtReceivablePage) {
        debtReceivablePage.classList.remove("active");
    }

    if (analyticsPage) {
        analyticsPage.classList.remove("active");
    }

    if (goalsPage) {
        goalsPage.classList.remove("active");
    }

    if (profilePage) {
        profilePage.classList.remove("active");
    }

    if (settingsPage) {
        settingsPage.classList.remove("active");
    }

    dashboardSections.forEach((section) => {
        section.style.display = "none";
    });

    if (pageName === "Ana Sayfa") {

        dashboardSections.forEach((section) => {
            section.style.display = "";
        });

    } else if (pageName === "İşlemler") {

        transactionsPage?.classList.add("active");
        renderAllTransactions();

    } else if (pageName === "Borç / Alacak") {

        debtReceivablePage?.classList.add("active");
        window.FixFinansDebtUI?.render();

        navigationItems.forEach((navItem) => {
            navItem.classList.remove("active");
        });

    } else if (pageName === "Hedeflerim") {

        goalsPage?.classList.add("active");
        renderGoals();

    } else if (pageName === "Analiz" || pageName === "Raporlar") {

        analyticsPage?.classList.add("active");
        initializeAnalyticsMonths();
        renderAnalytics();

    } else if (pageName === "Profil") {

        profilePage?.classList.add("active");
        renderSettings();
        renderProfileStats();

    } else if (pageName === "Ayarlar") {

        settingsPage?.classList.add("active");
        renderSettings();

    } else {

        dashboardSections.forEach((section) => {
            section.style.display = "";
        });

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ========================================
   DASHBOARD BAŞLAT
======================================== */

function initializeDashboard() {

    appState.settings =
        normalizeSettings(appState.settings);

    loadSettings();
    loadTransactions();
    loadGoals();

    applyTheme();
    renderSettings();

    updateDashboardBalance();
    renderDashboardMonthlyAndExpenses();
    renderTransactions();
    renderAllTransactions();

    initializeAnalyticsMonths();
    renderAnalytics();

    renderProfileStats();
    renderGoals();
    applyBalanceVisibility();

    setDefaultTransactionDate();


}


/* ========================================
   UYGULAMAYI BAŞLAT
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);


/* ========================================
   APP.JS SONU
======================================== */

/* ========================================
   13.1.3 BORÇ / ALACAK UI CONTROLLER
   CORE'a dokunmaz — yalnızca UI/repository
======================================== */
(function () {
    "use strict";

    let initialized = false;
    let repository = null;
    let activeFilter = "all";
    let movementSubmitting = false;

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => Array.from(document.querySelectorAll(selector));

    function getCore() {
        return window.FinanceDebtCore || null;
    }

    function formatMoney(amount, currency = "TRY") {
        try {
            return new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(Number(amount) || 0);
        } catch {
            return `${Number(amount) || 0} ${currency}`;
        }
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function formatDate(date) {
        if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return "—";
        }

        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    }

    function isRealDate(value) {
        if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return false;
        }

        const [year, month, day] = value.split("-").map(Number);
        const parsed = new Date(Date.UTC(year, month - 1, day));

        return parsed.getUTCFullYear() === year &&
            parsed.getUTCMonth() === month - 1 &&
            parsed.getUTCDate() === day;
    }

    function todayKey() {
        const now = new Date();
        return [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0")
        ].join("-");
    }

    function getStatusLabel(record, status) {
        const labels = {
            pending: "Bekliyor",
            partially_paid: record.direction === "debt"
                ? "Kısmi Ödendi"
                : "Kısmi Tahsil Edildi",
            paid: record.direction === "debt"
                ? "Ödendi"
                : "Tahsil Edildi",
            overdue: "Gecikmiş"
        };

        return labels[status] || status;
    }

    function getRecords() {
        if (!repository) return [];
        try {
            return repository.getAll();
        } catch (error) {
            console.error("Borç/Alacak kayıtları okunamadı:", error);
            return [];
        }
    }

    function aggregateByCurrency(records, valueGetter) {
        const totals = new Map();

        records.forEach((record) => {
            const currency = record.currency || "TRY";
            const value = Number(valueGetter(record)) || 0;
            totals.set(currency, (totals.get(currency) || 0) + value);
        });

        return Array.from(totals.entries())
            .filter(([, value]) => value !== 0)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([currency, value]) => formatMoney(value, currency))
            .join(" · ") || formatMoney(0, "TRY");
    }

    function renderSummary(records) {
        const core = getCore();
        if (!core) return;

        const debts = records.filter((record) => record.direction === "debt");
        const receivables = records.filter((record) => record.direction === "receivable");

        const totalDebtEl = $("#totalDebtAmount");
        const totalReceivableEl = $("#totalReceivableAmount");
        const remainingDebtEl = $("#remainingDebtAmount");
        const remainingReceivableEl = $("#remainingReceivableAmount");

        if (totalDebtEl) {
            totalDebtEl.textContent = aggregateByCurrency(debts, (record) => record.totalAmount);
        }
        if (totalReceivableEl) {
            totalReceivableEl.textContent = aggregateByCurrency(receivables, (record) => record.totalAmount);
        }
        if (remainingDebtEl) {
            remainingDebtEl.textContent = aggregateByCurrency(
                debts,
                (record) => core.getRemainingAmount(record)
            );
        }
        if (remainingReceivableEl) {
            remainingReceivableEl.textContent = aggregateByCurrency(
                receivables,
                (record) => core.getRemainingAmount(record)
            );
        }
    }

    function getFilteredRecords(records) {
        if (activeFilter === "all") return records;
        return records.filter((record) => record.direction === activeFilter);
    }

    function renderList() {
        const list = $("#debtReceivableList");
        const empty = $("#debtReceivableEmpty");
        const core = getCore();

        if (!list || !empty || !core || !repository) return;

        const records = getRecords();
        renderSummary(records);

        const filtered = getFilteredRecords(records)
            .slice()
            .sort((a, b) => {
                const dueA = a.dueDate || "";
                const dueB = b.dueDate || "";
                return dueA.localeCompare(dueB) ||
                    String(a.person).localeCompare(String(b.person), "tr");
            });

        list.innerHTML = "";

        if (!filtered.length) {
            empty.hidden = false;
            return;
        }

        empty.hidden = true;

        filtered.forEach((record) => {
            const status = getCore().getStatus(record);
            const remaining = getCore().getRemainingAmount(record);
            const article = document.createElement("article");

            article.className = `debt-record-card ${record.direction}`;
            article.dataset.recordId = record.id;

            article.innerHTML = `
                <div class="debt-record-main">
                    <div class="debt-record-title">
                        <strong>${escapeHtml(record.person)}</strong>
                        <span class="debt-direction-badge ${record.direction}">
                            ${record.direction === "debt" ? "BORÇ" : "ALACAK"}
                        </span>
                    </div>
                    <span class="debt-record-category">${escapeHtml(record.category)}</span>
                </div>

                <div class="debt-record-money">
                    <strong>${formatMoney(record.totalAmount, record.currency)}</strong>
                    <span>Kalan: ${formatMoney(remaining, record.currency)}</span>
                </div>

                <div class="debt-record-meta">
                    <span>Vade: ${formatDate(record.dueDate)}</span>
                    <span class="debt-status ${status}">
                        ${getStatusLabel(record, status)}
                    </span>
                </div>

                <button
                    type="button"
                    class="debt-record-open"
                    data-open-debt="${escapeHtml(record.id)}"
                    aria-label="${escapeHtml(record.person)} detayını aç"
                >
                    Detay
                </button>
            `;

            list.appendChild(article);
        });
    }

    function setFilter(filter) {
        if (!["all", "debt", "receivable"].includes(filter)) return;

        activeFilter = filter;

        $$(".debt-tab").forEach((button) => {
            const active = button.dataset.debtFilter === activeFilter;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
        });

        renderList();
    }

    function setDirection(direction) {
        if (direction !== "debt" && direction !== "receivable") return;

        const input = $("#debtDirection");
        if (input) input.value = direction;

        $$(".direction-option").forEach((button) => {
            const active = button.dataset.direction === direction;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    function showFormError(message) {
        const error = $("#debtFormError");
        if (!error) return;
        error.textContent = message;
        error.hidden = false;
    }

    function clearFormError() {
        const error = $("#debtFormError");
        if (!error) return;
        error.hidden = true;
        error.textContent = "";
    }

    function setTodayDefaults() {
        const today = todayKey();
        const date = $("#debtDate");
        const dueDate = $("#debtDueDate");

        if (date) date.value = today;
        if (dueDate) dueDate.value = today;
    }

    function openCreateModal() {
        const modal = $("#debtReceivableModal");
        const form = $("#debtReceivableForm");
        if (!modal || !form) return;

        form.reset();
        clearFormError();
        setDirection("debt");
        setTodayDefaults();
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        $("#debtPerson")?.focus();
    }

    function closeCreateModal() {
        const modal = $("#debtReceivableModal");
        if (modal) {
            modal.hidden = true;
            modal.setAttribute("aria-hidden", "true");
        }
        clearFormError();
    }

    function getFormPayload() {
        const payload = {
            direction: $("#debtDirection")?.value || "debt",
            person: $("#debtPerson")?.value || "",
            category: $("#debtCategory")?.value || "",
            description: $("#debtDescription")?.value || "",
            date: $("#debtDate")?.value || "",
            dueDate: $("#debtDueDate")?.value || "",
            account: $("#debtAccount")?.value || "",
            totalAmount: Number($("#debtAmount")?.value),
            currency: $("#debtCurrency")?.value || "TRY"
        };

        if (!payload.person.trim()) throw new Error("Kişi/Kurum zorunludur.");
        if (!payload.category.trim()) throw new Error("Kategori zorunludur.");
        if (!payload.account.trim()) throw new Error("Hesap zorunludur.");
        if (!isRealDate(payload.date)) throw new Error("Kayıt tarihi gerçek bir takvim tarihi olmalıdır.");
        if (!isRealDate(payload.dueDate)) throw new Error("Vade tarihi gerçek bir takvim tarihi olmalıdır.");
        if (!Number.isFinite(payload.totalAmount) || payload.totalAmount <= 0) {
            throw new Error("Toplam tutar 0'dan büyük bir sayı olmalıdır.");
        }

        return payload;
    }

    function handleCreateSubmit(event) {
        event.preventDefault();
        clearFormError();

        if (!repository || !getCore()) {
            showFormError("Borç/Alacak modülü hazır değil.");
            return;
        }

        try {
            const record = repository.create(getFormPayload());
            closeCreateModal();
            renderList();
            openDetail(record.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            showFormError(
                error instanceof Error ? error.message : "Kayıt oluşturulamadı."
            );
        }
    }

    function clearMovementError() {
        const error = $("#movementFormError");
        if (!error) return;
        error.hidden = true;
        error.textContent = "";
    }

    function showMovementError(message) {
        const error = $("#movementFormError");
        if (!error) return;
        error.hidden = false;
        error.textContent = message;
    }

    function setMovementBusy(busy) {
        const button = $("#movementSubmitButton");
        if (!button) return;
        button.disabled = busy;
        button.setAttribute("aria-busy", busy ? "true" : "false");
    }

    function openMovementModal(recordId) {
        if (!repository || !getCore()) return;

        const record = repository.getById(recordId);
        if (!record) {
            showMovementError("Borç/Alacak kaydı bulunamadı.");
            return;
        }

        const remaining = getCore().getRemainingAmount(record);
        if (remaining <= 0) {
            showMovementError(
                record.direction === "debt"
                    ? "Bu borç tamamen ödendi."
                    : "Bu alacak tamamen tahsil edildi."
            );
            return;
        }

        const modal = $("#debtMovementModal");
        const recordInput = $("#movementRecordId");
        const amountInput = $("#movementAmount");
        const dateInput = $("#movementDate");
        const noteInput = $("#movementNote");

        if (!modal || !recordInput || !amountInput || !dateInput || !noteInput) return;

        movementSubmitting = false;
        setMovementBusy(false);
        clearMovementError();

        recordInput.value = record.id;
        amountInput.value = "";
        dateInput.value = todayKey();
        noteInput.value = "";

        const isDebt = record.direction === "debt";
        $("#movementModalEyebrow").textContent = isDebt ? "ÖDEME" : "TAHSİLAT";
        $("#debt-movement-title").textContent = isDebt ? "Ödeme Ekle" : "Tahsilat Ekle";
        $("#movementSubmitText").textContent = isDebt ? "Ödemeyi Kaydet" : "Tahsilatı Kaydet";
        $("#movementRemainingAmount").textContent = formatMoney(remaining, record.currency);

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        amountInput.focus();
    }

    function closeMovementModal() {
        const modal = $("#debtMovementModal");
        if (!modal) return;

        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        // NOTE: movementSubmitting/setMovementBusy are intentionally NOT reset here.
        // Resetting them on close previously re-armed the submit button synchronously
        // right after a successful save, which let a rapid double click/tap slip a
        // second (duplicate) movement through before the modal finished hiding.
        // openMovementModal() already resets both whenever the modal is freshly opened,
        // and the catch block in handleMovementSubmit() resets them on a failed submit
        // so the user can immediately correct and retry.
        clearMovementError();
    }

    function handleMovementSubmit(event) {
        event.preventDefault();
        if (movementSubmitting) return;

        movementSubmitting = true;
        setMovementBusy(true);
        clearMovementError();

        try {
            if (!repository || !getCore()) {
                throw new Error("Borç/Alacak modülü hazır değil.");
            }

            const recordId = $("#movementRecordId")?.value || "";
            const record = repository.getById(recordId);

            if (!record) throw new Error("Borç/Alacak kaydı bulunamadı.");

            const expectedType = record.direction === "debt" ? "payment" : "collection";
            const remaining = getCore().getRemainingAmount(record);

            if (remaining <= 0) {
                throw new Error(
                    record.direction === "debt"
                        ? "Bu borç tamamen ödendi."
                        : "Bu alacak tamamen tahsil edildi."
                );
            }

            const amount = Number($("#movementAmount")?.value);
            if (!Number.isFinite(amount) || amount <= 0) {
                throw new Error("Hareket tutarı 0'dan büyük bir sayı olmalıdır.");
            }
            if (amount > remaining) {
                throw new Error("Girilen tutar kalan tutardan büyük olamaz.");
            }

            const date = $("#movementDate")?.value || "";
            if (!isRealDate(date)) {
                throw new Error("Hareket tarihi gerçek bir takvim tarihi olmalıdır.");
            }

            const note = $("#movementNote")?.value || "";

            repository.addMovement(record.id, {
                type: expectedType,
                amount,
                date,
                note
            });

            closeMovementModal();
            renderList();
            openDetail(record.id);
        } catch (error) {
            movementSubmitting = false;
            setMovementBusy(false);
            showMovementError(
                error instanceof Error ? error.message : "Hareket kaydedilemedi."
            );
        }
    }

    function deleteMovement(recordId, movementId) {
        if (!repository || !getCore()) return;

        const record = repository.getById(recordId);
        if (!record) return;

        const movement = Array.isArray(record.movements)
            ? record.movements.find((item) => item.id === movementId)
            : null;

        if (!movement) return;

        const confirmed = window.confirm(
            record.direction === "debt"
                ? "Bu ödeme hareketi silinsin mi?"
                : "Bu tahsilat hareketi silinsin mi?"
        );

        if (!confirmed) return;

        try {
            repository.removeMovement(record.id, movement.id);
            renderList();
            openDetail(record.id);
        } catch (error) {
            console.error("Hareket silinemedi:", error);
            alert(error instanceof Error ? error.message : "Hareket silinemedi.");
        }
    }

    function openDetail(id) {
        if (!repository || !getCore()) return;

        const record = repository.getById(id);
        const modal = $("#debtDetailModal");
        if (!record || !modal) return;

        const core = getCore();
        const state = core.getComputedState(record);
        const movements = Array.isArray(record.movements)
            ? record.movements.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)))
            : [];

        const movementRows = movements.length
            ? movements.map((movement) => `
                <div class="movement-row">
                    <div class="movement-row-main">
                        <strong>${formatDate(movement.date)}</strong>
                        ${movement.note ? `<small>${escapeHtml(movement.note)}</small>` : ""}
                    </div>
                    <strong>${formatMoney(movement.amount, record.currency)}</strong>
                    <span>${movement.type === "payment" ? "Ödeme" : "Tahsilat"}</span>
                    <button
                        type="button"
                        class="movement-delete"
                        data-delete-movement
                        data-record-id="${escapeHtml(record.id)}"
                        data-movement-id="${escapeHtml(movement.id)}"
                    >
                        Sil
                    </button>
                </div>
            `).join("")
            : `<p class="movement-empty">Henüz hareket bulunmuyor.</p>`;

        const canAddMovement = state.remainingAmount > 0;
        const isDebt = record.direction === "debt";

        modal.innerHTML = `
            <div
                class="finance-modal-content debt-detail-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="debt-detail-title"
            >
                <div class="finance-modal-header">
                    <div>
                        <span class="section-eyebrow">${isDebt ? "BORÇ" : "ALACAK"}</span>
                        <h3 id="debt-detail-title">${escapeHtml(record.person)}</h3>
                    </div>
                    <button
                        type="button"
                        class="modal-close"
                        data-close-debt-detail
                        aria-label="Detayı kapat"
                    >×</button>
                </div>

                <div class="debt-detail-grid">
                    <div>
                        <span>Toplam</span>
                        <strong>${formatMoney(record.totalAmount, record.currency)}</strong>
                    </div>
                    <div>
                        <span>${isDebt ? "Ödenen" : "Tahsil Edilen"}</span>
                        <strong>${formatMoney(state.settledAmount, record.currency)}</strong>
                    </div>
                    <div>
                        <span>Kalan</span>
                        <strong>${formatMoney(state.remainingAmount, record.currency)}</strong>
                    </div>
                    <div>
                        <span>Durum</span>
                        <strong class="debt-status ${state.status}">${getStatusLabel(record, state.status)}</strong>
                    </div>
                </div>

                <div class="debt-detail-info">
                    <p><strong>Kategori:</strong> ${escapeHtml(record.category)}</p>
                    <p><strong>Hesap:</strong> ${escapeHtml(record.account)}</p>
                    <p><strong>Tarih:</strong> ${formatDate(record.date)}</p>
                    <p><strong>Vade:</strong> ${formatDate(record.dueDate)}</p>
                    ${record.description ? `<p><strong>Açıklama:</strong> ${escapeHtml(record.description)}</p>` : ""}
                </div>

                ${canAddMovement ? `
                    <button
                        type="button"
                        class="primary-button full-width debt-movement-add-button"
                        data-add-movement
                        data-record-id="${escapeHtml(record.id)}"
                    >
                        + ${isDebt ? "Ödeme Ekle" : "Tahsilat Ekle"}
                    </button>
                ` : ""}

                <div class="movement-section">
                    <div class="movement-section-header">
                        <h4>${isDebt ? "Ödeme Geçmişi" : "Tahsilat Geçmişi"}</h4>
                    </div>
                    ${movementRows}
                </div>
            </div>
        `;

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
    }

    function closeDetail() {
        const modal = $("#debtDetailModal");
        if (!modal) return;
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
    }

    function bindEvents() {
        if (initialized) return;

        $("#openDebtReceivableModal")?.addEventListener("click", openCreateModal);
        $("#closeDebtReceivableModal")?.addEventListener("click", closeCreateModal);
        $("#debtModalCancel")?.addEventListener("click", closeCreateModal);

        $("#debtReceivableModal")?.addEventListener("click", (event) => {
            if (event.target.id === "debtReceivableModal") closeCreateModal();
        });

        $("#debtReceivableForm")?.addEventListener("submit", handleCreateSubmit);
        $("#debtMovementForm")?.addEventListener("submit", handleMovementSubmit);
        $("#closeDebtMovementModal")?.addEventListener("click", closeMovementModal);
        $("#movementModalCancel")?.addEventListener("click", closeMovementModal);

        $("#debtMovementModal")?.addEventListener("click", (event) => {
            if (event.target.id === "debtMovementModal") closeMovementModal();
        });

        $$(".direction-option").forEach((button) => {
            button.addEventListener("click", () => setDirection(button.dataset.direction));
        });

        $$(".debt-tab").forEach((button) => {
            button.addEventListener("click", () => setFilter(button.dataset.debtFilter));
        });

        $("#debtReceivableList")?.addEventListener("click", (event) => {
            const button = event.target.closest("[data-open-debt]");
            if (!button) return;
            openDetail(button.dataset.openDebt);
        });

        $("#debtDetailModal")?.addEventListener("click", (event) => {
            const addButton = event.target.closest("[data-add-movement]");
            if (addButton) {
                openMovementModal(addButton.dataset.recordId);
                return;
            }

            const deleteButton = event.target.closest("[data-delete-movement]");
            if (deleteButton) {
                deleteMovement(
                    deleteButton.dataset.recordId,
                    deleteButton.dataset.movementId
                );
                return;
            }

            if (
                event.target === $("#debtDetailModal") ||
                event.target.closest("[data-close-debt-detail]")
            ) {
                closeDetail();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;

            if (!$("#debtMovementModal")?.hidden) {
                closeMovementModal();
            } else if (!$("#debtReceivableModal")?.hidden) {
                closeCreateModal();
            } else if (!$("#debtDetailModal")?.hidden) {
                closeDetail();
            }
        });

        initialized = true;
    }

    function init() {
        const core = getCore();
        const page = $("#debt-receivable-page");
        if (!core || !page) return;

        repository = window.FinanceDebtRepository.createRepository();
        bindEvents();
        renderList();
    }

    window.FixFinansDebtUI = Object.freeze({
        init,
        render: renderList,
        openCreateModal,
        openDetail,
        closeDetail
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();

/* ========================================
   13.1.5 PROFİL — HESAPLAR & KATEGORİLER
======================================== */
(function () {
    "use strict";

    const ACCOUNTS_KEY = "finance_accounts";
    const CATEGORIES_KEY = "finance_categories";

    const defaultAccounts = [
        { id: "cash", name: "Nakit", icon: "💵", type: "Nakit" },
        { id: "bank", name: "Banka Hesabı", icon: "🏦", type: "Banka" },
        { id: "credit-card", name: "Kredi Kartı", icon: "💳", type: "Kredi Kartı" }
    ];

    const defaultCategories = [
        { id: "salary", name: "Maaş", icon: "💰", type: "income" },
        { id: "market", name: "Market", icon: "🛒", type: "expense" },
        { id: "bills", name: "Faturalar", icon: "🧾", type: "expense" },
        { id: "food", name: "Yemek", icon: "🍽️", type: "expense" },
        { id: "transport", name: "Ulaşım", icon: "🚗", type: "expense" },
        { id: "entertainment", name: "Eğlence", icon: "🎬", type: "expense" },
        { id: "shopping", name: "Alışveriş", icon: "🛍️", type: "expense" },
        { id: "other", name: "Diğer", icon: "📦", type: "both" }
    ];

    const read = (key, fallback) => {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "null");
            return Array.isArray(value) ? value : fallback.map(item => ({ ...item }));
        } catch (_) {
            return fallback.map(item => ({ ...item }));
        }
    };

    const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

    let accounts = read(ACCOUNTS_KEY, defaultAccounts);
    let categories = read(CATEGORIES_KEY, defaultCategories);

    function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
        }[char]));
    }

    function injectProfileTools() {
        const profile = document.querySelector("#profile-page");
        if (!profile || document.querySelector("#profile-management-card")) return;

        const card = document.createElement("article");
        card.className = "settings-card profile-management-card";
        card.id = "profile-management-card";
        card.innerHTML = `
            <div class="settings-card-header">
                <span class="section-label">Finans Yapısı</span>
                <h2>Hesaplar & Kategoriler</h2>
                <p class="management-description">İşlem eklerken kullanacağın hesap ve kategori seçeneklerini yönet.</p>
            </div>
            <div class="management-section">
                <div class="management-heading"><strong>Hesaplar</strong><button type="button" class="mini-add-button" id="add-account-button">+</button></div>
                <div id="profile-account-list" class="management-list"></div>
            </div>
            <div class="management-section">
                <div class="management-heading"><strong>Kategoriler</strong><button type="button" class="mini-add-button" id="add-category-button">+</button></div>
                <div id="profile-category-list" class="management-list"></div>
            </div>`;
        profile.appendChild(card);

        document.querySelector("#add-account-button")?.addEventListener("click", addAccount);
        document.querySelector("#add-category-button")?.addEventListener("click", addCategory);
        renderManagement();
    }

    function renderManagement() {
        const accountList = document.querySelector("#profile-account-list");
        const categoryList = document.querySelector("#profile-category-list");
        if (!accountList || !categoryList) return;

        accountList.innerHTML = accounts.map(account => `
            <div class="management-row">
                <span class="management-icon">${escapeHtml(account.icon)}</span>
                <span class="management-main"><strong>${escapeHtml(account.name)}</strong><small>${escapeHtml(account.type)}</small></span>
                <button type="button" class="management-delete" data-delete-account="${escapeHtml(account.id)}" aria-label="Hesabı sil">×</button>
            </div>`).join("");

        categoryList.innerHTML = categories.map(category => `
            <div class="management-row">
                <span class="management-icon">${escapeHtml(category.icon)}</span>
                <span class="management-main"><strong>${escapeHtml(category.name)}</strong><small>${category.type === "income" ? "Gelir" : category.type === "expense" ? "Gider" : "Gelir + Gider"}</small></span>
                <button type="button" class="management-delete" data-delete-category="${escapeHtml(category.id)}" aria-label="Kategoriyi sil">×</button>
            </div>`).join("");

        accountList.querySelectorAll("[data-delete-account]").forEach(button => {
            button.addEventListener("click", () => deleteAccount(button.dataset.deleteAccount));
        });
        categoryList.querySelectorAll("[data-delete-category]").forEach(button => {
            button.addEventListener("click", () => deleteCategory(button.dataset.deleteCategory));
        });

        refreshTransactionOptions();
    }

    function addAccount() {
        openPremiumInputModal({ title: "Yeni Hesap", kicker: "Finans Yapısı", label: "Hesap adı", value: "", submitLabel: "Hesabı Ekle", onSubmit: (name, close) => {
            if (!String(name).trim()) { toast("Hesap adı gerekli."); return; }
            accounts.push({ id: `account-${Date.now()}`, name: String(name).trim().slice(0,60), icon: "💳", type: "Özel Hesap" });
            write(ACCOUNTS_KEY, accounts); renderManagement(); close(); toast("Hesap eklendi.");
        }});
    }

    function addCategory() {
        const options=[{value:"expense",label:"Gider"},{value:"income",label:"Gelir"},{value:"both",label:"Gelir + Gider"}];
        openPremiumInputModal({ title: "Yeni Kategori", kicker: "Finans Yapısı", label: "Kategori adı", value: "", options:null, submitLabel: "İleri", onSubmit: (name, close) => {
            if (!String(name).trim()) { toast("Kategori adı gerekli."); return; }
            close();
            openPremiumInputModal({ title: "Kategori Türü", kicker: String(name).trim(), label: "Tür", options, submitLabel: "Kategori Ekle", onSubmit: (type, close2) => {
                categories.push({ id: `category-${Date.now()}`, name: String(name).trim().slice(0,60), icon: "✨", type });
                write(CATEGORIES_KEY, categories); renderManagement(); close2(); toast("Kategori eklendi.");
            }});
        }});
    }

    function deleteAccount(id) {
        if (accounts.length <= 1) return toast("En az bir hesap kalmalı.");
        if (hasAccountUsage(id)) return toast("Bu hesap mevcut işlemlerde kullanılıyor. Önce bağlı işlemleri düzenle.");
        if (!window.confirm("Bu hesabı silmek istediğine emin misin?")) return;
        accounts = accounts.filter(item => item.id !== id);
        write(ACCOUNTS_KEY, accounts);
        renderManagement();
        toast("Hesap silindi.");
    }

    function deleteCategory(id) {
        if (categories.length <= 1) return toast("En az bir kategori kalmalı.");
        if (hasCategoryUsage(id)) return toast("Bu kategori mevcut işlemlerde kullanılıyor. Önce bağlı işlemleri düzenle.");
        if (!window.confirm("Bu kategoriyi silmek istediğine emin misin?")) return;
        categories = categories.filter(item => item.id !== id);
        write(CATEGORIES_KEY, categories);
        renderManagement();
        toast("Kategori silindi.");
    }

    function replaceData(importedAccounts, importedCategories) {
        accounts = Array.isArray(importedAccounts)
            ? importedAccounts.map(item => ({ ...item }))
            : defaultAccounts.map(item => ({ ...item }));
        categories = Array.isArray(importedCategories)
            ? importedCategories.map(item => ({ ...item }))
            : defaultCategories.map(item => ({ ...item }));
        write(ACCOUNTS_KEY, accounts);
        write(CATEGORIES_KEY, categories);
        renderManagement();
        refreshTransactionOptions();
    }

    function clearData() {
        accounts = [];
        categories = [];
        write(ACCOUNTS_KEY, accounts);
        write(CATEGORIES_KEY, categories);
        renderManagement();
        refreshTransactionOptions();
    }

    function hasAccountUsage(id) { return appState.transactions.some(t => t.accountId === id || t.account === id || t.account === accounts.find(a => a.id === id)?.name); }
    function hasCategoryUsage(id) { return appState.transactions.some(t => t.categoryId === id || t.category === id || t.category === categories.find(c => c.id === id)?.name); }

    function refreshTransactionOptions() {
        const accountSelect = document.querySelector("#transaction-account");
        const categorySelect = document.querySelector("#transaction-category");
        if (accountSelect) {
            const current = accountSelect.value;
            accountSelect.innerHTML = `<option value="">Hesap seç</option>` + accounts.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join("");
            if (accounts.some(item => item.id === current)) accountSelect.value = current;
        }
        if (categorySelect) {
            const current = categorySelect.value;
            const activeType = appState.activeTransactionType;
            const allowed = categories.filter(item => activeType === "income" ? ["income","both"].includes(item.type) : activeType === "expense" ? ["expense","both"].includes(item.type) : true);
            categorySelect.innerHTML = `<option value="">Kategori seç</option>` + allowed.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join("");
            if (allowed.some(item => item.id === current)) categorySelect.value = current;
        }
    }

    function toast(message) {
        if (typeof window.showToast === "function") window.showToast(message, "success");
    }

    function init() {
        injectProfileTools();
        refreshTransactionOptions();
    }

    window.FixFinansProfileManagement = Object.freeze({
        init,
        getAccounts: () => accounts.map(item => ({ ...item })),
        getCategories: () => categories.map(item => ({ ...item })),
        replaceData,
        clearData
    });

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
    else init();
})();
