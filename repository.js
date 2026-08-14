/* Fix Finans — Borç / Alacak Repository
   Persistence only. Domain rules live in debt-core.js. */
(function (global) {
    "use strict";

    const STORAGE_KEY = global.FinanceDebtCore.STORAGE_KEY;
    const { createRecord, updateRecord, addMovement, removeMovement, assertUniqueIds } = global.FinanceDebtCore;

    function createRepository(storage = global.localStorage) {
        function readAll() {
            if (!storage) return [];

            try {
                const raw = storage.getItem(STORAGE_KEY);
                if (!raw) return [];

                const parsed = JSON.parse(raw);

                if (!Array.isArray(parsed)) {
                    throw new Error("Borç/Alacak veri deposu geçersiz.");
                }

                const records = parsed.map(createRecord);
                assertUniqueIds(records);

                return records;
            } catch (error) {
                console.error("Borç/Alacak verisi okunamadı:", error);
                return [];
            }
        }

        function writeAll(records) {
            if (!storage) return;

            const normalized = records.map(createRecord);
            assertUniqueIds(normalized);
            storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        }

        return Object.freeze({
            key: STORAGE_KEY,

            getAll: readAll,

            getById(id) {
                return readAll().find(record => record.id === id) || null;
            },

            create(input) {
                const record = createRecord(input);
                const records = readAll();

                if (records.some(existing => existing.id === record.id)) {
                    throw new Error(`Kayıt ID zaten mevcut: ${record.id}`);
                }

                writeAll([...records, record]);
                return record;
            },

            update(id, patch) {
                const records = readAll();
                const current = records.find(record => record.id === id);

                if (!current) {
                    throw new Error("Borç/Alacak kaydı bulunamadı.");
                }

                const updated = updateRecord(current, patch);
                writeAll(records.map(record =>
                    record.id === id ? updated : record
                ));

                return updated;
            },

            addMovement(id, movement) {
                const records = readAll();
                const current = records.find(record => record.id === id);

                if (!current) {
                    throw new Error("Borç/Alacak kaydı bulunamadı.");
                }

                const updated = addMovement(current, movement);
                writeAll(records.map(record =>
                    record.id === id ? updated : record
                ));

                return updated;
            },

            removeMovement(id, movementId) {
                const records = readAll();
                const current = records.find(record => record.id === id);

                if (!current) {
                    throw new Error("Borç/Alacak kaydı bulunamadı.");
                }

                const updated = removeMovement(current, movementId);
                writeAll(records.map(record =>
                    record.id === id ? updated : record
                ));

                return updated;
            },

            remove(id) {
                const records = readAll();
                writeAll(records.filter(record => record.id !== id));
            },

            clear() {
                if (storage) storage.removeItem(STORAGE_KEY);
            }
        });
    }


    global.FinanceDebtRepository = Object.freeze({ createRepository });
})(window);
