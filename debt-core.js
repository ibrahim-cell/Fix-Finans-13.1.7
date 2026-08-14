/* ============================================================
   FIX FINANS — 13.1 BORÇ / ALACAK CORE v2
   UI YOK — DOMAIN / VERİ MODELİ / HAREKET MANTIĞI
============================================================ */

(function (global) {
    "use strict";

    const VERSION = 2;
    const STORAGE_KEY = "finance_debt_records_v2";

    const DIRECTIONS = Object.freeze({
        DEBT: "debt",
        RECEIVABLE: "receivable"
    });

    const STATUS = Object.freeze({
        PENDING: "pending",
        PARTIALLY_PAID: "partially_paid",
        PAID: "paid",
        OVERDUE: "overdue"
    });

    const MOVEMENT_TYPES = Object.freeze({
        PAYMENT: "payment",
        COLLECTION: "collection"
    });

    function createId(prefix) {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    }

    function nowIso() {
        return new Date().toISOString();
    }

    function nextUpdatedAt(previous) {
        const currentMs = Date.now();
        const previousMs = previous ? Date.parse(previous) : NaN;
        const nextMs = Number.isFinite(previousMs)
            ? Math.max(currentMs, previousMs + 1)
            : currentMs;

        return new Date(nextMs).toISOString();
    }

    function roundAmount(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    function toPositiveAmount(value, fieldName = "Tutar") {
        const amount = Number(value);

        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error(`${fieldName} 0'dan büyük bir sayı olmalıdır.`);
        }

        return roundAmount(amount);
    }

    function requireText(value, fieldName) {
        if (typeof value !== "string" || !value.trim()) {
            throw new Error(`${fieldName} zorunludur.`);
        }

        return value.trim();
    }

    function normalizeDate(value, fieldName) {
        const date = requireText(value, fieldName);

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            throw new Error(`${fieldName} YYYY-MM-DD formatında olmalıdır.`);
        }

        const [year, month, day] = date.split("-").map(Number);
        const parsed = new Date(Date.UTC(year, month - 1, day));

        if (
            parsed.getUTCFullYear() !== year ||
            parsed.getUTCMonth() !== month - 1 ||
            parsed.getUTCDate() !== day
        ) {
            throw new Error(`${fieldName} gerçek bir takvim tarihi olmalıdır.`);
        }

        return date;
    }

    function normalizeDirection(value) {
        if (value !== DIRECTIONS.DEBT && value !== DIRECTIONS.RECEIVABLE) {
            throw new Error("Borç/Alacak tipi geçersiz.");
        }

        return value;
    }

    function expectedMovementType(direction) {
        return direction === DIRECTIONS.DEBT
            ? MOVEMENT_TYPES.PAYMENT
            : MOVEMENT_TYPES.COLLECTION;
    }

    function normalizeMovement(input, direction) {
        if (!input || typeof input !== "object") {
            throw new Error("Ödeme/Tahsilat hareketi geçersiz.");
        }

        const type = input.type || expectedMovementType(direction);

        if (type !== expectedMovementType(direction)) {
            throw new Error("Hareket tipi kayıt yönüyle uyuşmuyor.");
        }

        return {
            id: requireText(
                typeof input.id === "string" && input.id.trim()
                    ? input.id
                    : createId("movement"),
                "Hareket ID"
            ),
            type,
            amount: toPositiveAmount(input.amount, "Hareket tutarı"),
            date: normalizeDate(input.date, "Hareket tarihi"),
            note: typeof input.note === "string"
                ? input.note.trim()
                : "",
            createdAt: typeof input.createdAt === "string" && input.createdAt.trim()
                ? input.createdAt
                : nowIso()
        };
    }

    function createRecord(input) {
        if (!input || typeof input !== "object") {
            throw new Error("Borç/Alacak kaydı geçersiz.");
        }

        const direction = normalizeDirection(input.direction);

        const record = {
            id: requireText(
                typeof input.id === "string" && input.id.trim()
                    ? input.id
                    : createId("debt"),
                "Kayıt ID"
            ),
            version: VERSION,
            direction,

            person: requireText(input.person, "Kişi/Kurum"),
            category: requireText(input.category, "Kategori"),
            description: typeof input.description === "string"
                ? input.description.trim()
                : "",

            date: normalizeDate(input.date, "Kayıt tarihi"),
            dueDate: normalizeDate(input.dueDate, "Vade tarihi"),

            account: requireText(input.account, "Hesap"),
            totalAmount: toPositiveAmount(input.totalAmount, "Toplam tutar"),
            currency: typeof input.currency === "string" && input.currency.trim()
                ? input.currency.trim().toUpperCase()
                : "TRY",

            createdAt: typeof input.createdAt === "string" && input.createdAt.trim()
                ? input.createdAt
                : nowIso(),

            updatedAt: typeof input.updatedAt === "string" && input.updatedAt.trim()
                ? input.updatedAt
                : (
                    typeof input.createdAt === "string" && input.createdAt.trim()
                        ? input.createdAt
                        : nowIso()
                ),

            movements: Array.isArray(input.movements)
                ? input.movements.map(m => normalizeMovement(m, direction))
                : []
        };

        if (getSettledAmount(record) > record.totalAmount) {
            throw new Error("Mevcut hareketler toplam tutarı aşamaz.");
        }

        return record;
    }

    function getSettledAmount(record) {
        return roundAmount(
            record.movements.reduce(
                (sum, movement) => sum + Number(movement.amount),
                0
            )
        );
    }

    function getRemainingAmount(record) {
        return Math.max(
            0,
            roundAmount(record.totalAmount - getSettledAmount(record))
        );
    }

    function getBaseStatus(record) {
        const settled = getSettledAmount(record);

        if (settled <= 0) return STATUS.PENDING;
        if (settled < record.totalAmount) return STATUS.PARTIALLY_PAID;
        return STATUS.PAID;
    }

    function toDateKey(date) {
        if (date instanceof Date) {
            if (Number.isNaN(date.getTime())) {
                throw new Error("Gecikme kontrol tarihi geçersiz.");
            }

            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        }

        return normalizeDate(date, "Kontrol tarihi");
    }

    function isOverdue(record, today = new Date()) {
        if (getBaseStatus(record) === STATUS.PAID) {
            return false;
        }

        return record.dueDate < toDateKey(today);
    }

    function getStatus(record, today = new Date()) {
        if (isOverdue(record, today)) {
            return STATUS.OVERDUE;
        }

        return getBaseStatus(record);
    }

    function getComputedState(record, today = new Date()) {
        return Object.freeze({
            settledAmount: getSettledAmount(record),
            remainingAmount: getRemainingAmount(record),
            status: getStatus(record, today),
            overdue: isOverdue(record, today)
        });
    }

    function addMovement(record, input) {
        const movement = normalizeMovement(input, record.direction);
        const currentSettled = getSettledAmount(record);

        if (currentSettled + movement.amount > record.totalAmount) {
            throw new Error("Ödeme/Tahsilat toplamı kayıt tutarını aşamaz.");
        }

        return {
            ...record,
            updatedAt: nextUpdatedAt(record.updatedAt),
            movements: [...record.movements, movement]
        };
    }

    function removeMovement(record, movementId) {
        const id = requireText(movementId, "Hareket ID");

        if (!record.movements.some(m => m.id === id)) {
            throw new Error("Hareket bulunamadı.");
        }

        return {
            ...record,
            updatedAt: nextUpdatedAt(record.updatedAt),
            movements: record.movements.filter(m => m.id !== id)
        };
    }

    function updateRecord(record, patch) {
        if (!patch || typeof patch !== "object") {
            throw new Error("Güncelleme verisi geçersiz.");
        }

        const next = createRecord({
            ...record,
            ...patch,
            id: record.id,
            createdAt: record.createdAt,
            updatedAt: nextUpdatedAt(record.updatedAt),
            movements: record.movements
        });

        return next;
    }

    function assertUniqueIds(records) {
        const seen = new Set();

        for (const record of records) {
            if (seen.has(record.id)) {
                throw new Error(`Kayıt ID çakışması: ${record.id}`);
            }

            seen.add(record.id);

            const movementIds = new Set();

            for (const movement of record.movements) {
                if (movementIds.has(movement.id)) {
                    throw new Error(`Hareket ID çakışması: ${movement.id}`);
                }

                movementIds.add(movement.id);

                if (seen.has(movement.id)) {
                    throw new Error(`ID çakışması: ${movement.id}`);
                }

                seen.add(movement.id);
            }
        }
    }

    const api = Object.freeze({
        VERSION,
        STORAGE_KEY,
        DIRECTIONS,
        STATUS,
        MOVEMENT_TYPES,
        createRecord,
        addMovement,
        removeMovement,
        updateRecord,
        getSettledAmount,
        getRemainingAmount,
        getBaseStatus,
        getStatus,
        isOverdue,
        getComputedState,
        assertUniqueIds
    });

    global.FinanceDebtCore = api;
})(window);
