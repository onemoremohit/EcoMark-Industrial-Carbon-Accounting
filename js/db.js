// EcoMark Local Storage Database Simulation & Carbon Engine

const EMISSION_FACTORS = {
    "diesel": 2.68,         // kg CO2e per liter
    "petrol": 2.31,         // kg CO2e per liter
    "lpg": 1.51,            // kg CO2e per liter
    "natural_gas": 2.04,    // kg CO2e per m3
    "coal": 2.42,           // kg CO2e per kg
    "furnace_oil": 3.15,    // kg CO2e per liter
    "biomass": 0.41,        // kg CO2e per kg
    "electricity": 0.82     // kg CO2e per kWh
};

const COIN_TRIGGERS = {
    REGISTER: 100,
    FIRST_REPORT: 200,
    ON_TIME: 50,
    SCORE_A_OR_APLUS: 300,
    REDUCTION_10: 500,
    REDUCTION_25: 1000,
    NET_ZERO: 2000
};

// Initialize DB if not present
function initDB() {
    if (!localStorage.getItem('ecomark_db_initialized_v2')) {
        const users = {
            "admin_uid": {
                uid: "admin_uid",
                email: "admin@ecomark.com",
                password: "admin",
                role: "admin",
                companyName: "EcoMark regulator Bureau",
                industry: "Government / Regulation",
                location: "New Delhi"
            },
            "ravi_steel_uid": {
                uid: "ravi_steel_uid",
                email: "company1@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Ravi Steel Industries",
                industry: "Manufacturing",
                location: "Pune",
                ecoCoins: 850
            },
            "greenwave_uid": {
                uid: "greenwave_uid",
                email: "company2@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "GreenWave Textiles",
                industry: "Textile",
                location: "Surat",
                ecoCoins: 1450
            },
            "sunbake_uid": {
                uid: "sunbake_uid",
                email: "company3@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "SunBake Foods",
                industry: "Food Processing",
                location: "Nashik",
                ecoCoins: 1950
            },
            "shakti_steel_uid": {
                uid: "shakti_steel_uid",
                email: "company4@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Shakti Steel Ltd",
                industry: "Manufacturing",
                location: "Mumbai",
                ecoCoins: 500
            },
            "golden_grains_uid": {
                uid: "golden_grains_uid",
                email: "company5@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Golden Grains Co",
                industry: "Food Processing",
                location: "Amritsar",
                ecoCoins: 600
            }
        };

        const products = {
            "prod_ravi_steel": {
                productId: "prod_ravi_steel",
                companyId: "ravi_steel_uid",
                productName: "Steel Rod Grade-60",
                category: "Manufacturing",
                latestScore: "C",
                latestCO2ePerUnit: 5.256,
                reportHistory: ["rep_ravi_q2", "rep_ravi_q3"]
            },
            "prod_greenwave_textiles": {
                productId: "prod_greenwave_textiles",
                companyId: "greenwave_uid",
                productName: "Cotton Fabric Roll",
                category: "Textile",
                latestScore: "A",
                latestCO2ePerUnit: 1.022,
                reportHistory: ["rep_green_q2", "rep_green_q3"]
            },
            "prod_sunbake_foods": {
                productId: "prod_sunbake_foods",
                companyId: "sunbake_uid",
                productName: "Packaged Wheat Flour",
                category: "Food Processing",
                latestScore: "A+",
                latestCO2ePerUnit: 0.1575,
                reportHistory: ["rep_sun_q2", "rep_sun_q3"]
            },
            "prod_shakti_steel": {
                productId: "prod_shakti_steel",
                companyId: "shakti_steel_uid",
                productName: "Steel Rod Grade-50",
                category: "Manufacturing",
                latestScore: "B",
                latestCO2ePerUnit: 3.120,
                reportHistory: ["rep_shakti_q3"]
            },
            "prod_golden_grains": {
                productId: "prod_golden_grains",
                companyId: "golden_grains_uid",
                productName: "Golden Wheat Flour",
                category: "Food Processing",
                latestScore: "A",
                latestCO2ePerUnit: 0.920,
                reportHistory: ["rep_golden_q3"]
            }
        };

        const reports = {
            "rep_ravi_q2": {
                reportId: "rep_ravi_q2",
                companyId: "ravi_steel_uid",
                productId: "prod_ravi_steel",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 900, unit: "liters" },
                    { fuel_type: "coal", quantity: 250, unit: "kg" }
                ],
                batchSize: 500,
                totalCO2e: 3017.0,
                co2ePerUnit: 6.034,
                score: "C",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_ravi_q3": {
                reportId: "rep_ravi_q3",
                companyId: "ravi_steel_uid",
                productId: "prod_ravi_steel",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 800, unit: "liters" },
                    { fuel_type: "coal", quantity: 200, unit: "kg" }
                ],
                batchSize: 500,
                totalCO2e: 2628.0,
                co2ePerUnit: 5.256,
                score: "C",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_green_q2": {
                reportId: "rep_green_q2",
                companyId: "greenwave_uid",
                productId: "prod_greenwave_textiles",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "natural_gas", quantity: 350, unit: "m3" },
                    { fuel_type: "electricity", quantity: 600, unit: "kWh" }
                ],
                batchSize: 1000,
                totalCO2e: 1206.0,
                co2ePerUnit: 1.206,
                score: "A",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_green_q3": {
                reportId: "rep_green_q3",
                companyId: "greenwave_uid",
                productId: "prod_greenwave_textiles",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "natural_gas", quantity: 300, unit: "m3" },
                    { fuel_type: "electricity", quantity: 500, unit: "kWh" }
                ],
                batchSize: 1000,
                totalCO2e: 1022.0,
                co2ePerUnit: 1.022,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_sun_q2": {
                reportId: "rep_sun_q2",
                companyId: "sunbake_uid",
                productId: "prod_sunbake_foods",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 140, unit: "liters" },
                    { fuel_type: "electricity", quantity: 280, unit: "kWh" }
                ],
                batchSize: 2000,
                totalCO2e: 441.0,
                co2ePerUnit: 0.2205,
                score: "A+",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_sun_q3": {
                reportId: "rep_sun_q3",
                companyId: "sunbake_uid",
                productId: "prod_sunbake_foods",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 100, unit: "liters" },
                    { fuel_type: "electricity", quantity: 200, unit: "kWh" }
                ],
                batchSize: 2000,
                totalCO2e: 315.0,
                co2ePerUnit: 0.1575,
                score: "A+",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_shakti_q3": {
                reportId: "rep_shakti_q3",
                companyId: "shakti_steel_uid",
                productId: "prod_shakti_steel",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "coal", quantity: 600, unit: "kg" },
                    { fuel_type: "electricity", quantity: 120, unit: "kWh" }
                ],
                batchSize: 500,
                totalCO2e: 1560.0,
                co2ePerUnit: 3.120,
                score: "B",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_golden_q3": {
                reportId: "rep_golden_q3",
                companyId: "golden_grains_uid",
                productId: "prod_golden_grains",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 500, unit: "liters" },
                    { fuel_type: "electricity", quantity: 1300, unit: "kWh" }
                ],
                batchSize: 2000,
                totalCO2e: 1840.0,
                co2ePerUnit: 0.920,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            }
        };

        const ecoCoinsHistory = {
            "coins_ravi_1": { id: "coins_ravi_1", companyId: "ravi_steel_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString() },
            "coins_ravi_2": { id: "coins_ravi_2", companyId: "ravi_steel_uid", trigger: "First Fuel Report (2024-Q2)", amount: 200, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_ravi_3": { id: "coins_ravi_3", companyId: "ravi_steel_uid", trigger: "Fuel Report (2024-Q3)", amount: 50, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_ravi_4": { id: "coins_ravi_4", companyId: "ravi_steel_uid", trigger: "10%+ Carbon Footprint Reduction (Q3 vs Q2)", amount: 500, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },

            "coins_green_1": { id: "coins_green_1", companyId: "greenwave_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString() },
            "coins_green_2": { id: "coins_green_2", companyId: "greenwave_uid", trigger: "First Fuel Report (2024-Q2)", amount: 200, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_green_3": { id: "coins_green_3", companyId: "greenwave_uid", trigger: "Rating A Achieved (2024-Q2)", amount: 300, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_green_4": { id: "coins_green_4", companyId: "greenwave_uid", trigger: "Rating A Achieved (2024-Q3)", amount: 300, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_green_5": { id: "coins_green_5", companyId: "greenwave_uid", trigger: "Fuel Report (2024-Q3)", amount: 50, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_green_6": { id: "coins_green_6", companyId: "greenwave_uid", trigger: "10%+ Carbon Footprint Reduction (Q3 vs Q2)", amount: 500, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },

            "coins_sun_1": { id: "coins_sun_1", companyId: "sunbake_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString() },
            "coins_sun_2": { id: "coins_sun_2", companyId: "sunbake_uid", trigger: "First Fuel Report (2024-Q2)", amount: 200, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_sun_3": { id: "coins_sun_3", companyId: "sunbake_uid", trigger: "Rating A+ Achieved (2024-Q2)", amount: 300, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_sun_4": { id: "coins_sun_4", companyId: "sunbake_uid", trigger: "Rating A+ Achieved (2024-Q3)", amount: 300, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_sun_5": { id: "coins_sun_5", companyId: "sunbake_uid", trigger: "Fuel Report (2024-Q3)", amount: 50, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_sun_6": { id: "coins_sun_6", companyId: "sunbake_uid", trigger: "25%+ Carbon Footprint Reduction (Q3 vs Q2)", amount: 1000, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
        };

        const auditLogs = [
            { logId: "log_1", action: "company_registered", companyId: "ravi_steel_uid", timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString(), detail: "Ravi Steel Industries registered on EcoMark." },
            { logId: "log_2", action: "report_submitted", companyId: "ravi_steel_uid", reportId: "rep_ravi_q2", timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString(), detail: "Report submitted for Steel Rod Grade-60 (2024-Q2)." },
            { logId: "log_3", action: "report_submitted", companyId: "ravi_steel_uid", reportId: "rep_ravi_q3", timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString(), detail: "Report submitted for Steel Rod Grade-60 (2024-Q3)." },
            { logId: "log_4", action: "company_registered", companyId: "greenwave_uid", timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString(), detail: "GreenWave Textiles registered on EcoMark." },
            { logId: "log_5", action: "report_submitted", companyId: "greenwave_uid", reportId: "rep_green_q2", timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString(), detail: "Report submitted for Cotton Fabric Roll (2024-Q2)." },
            { logId: "log_6", action: "report_submitted", companyId: "greenwave_uid", reportId: "rep_green_q3", timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString(), detail: "Report submitted for Cotton Fabric Roll (2024-Q3)." },
            { logId: "log_7", action: "company_registered", companyId: "sunbake_uid", timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString(), detail: "SunBake Foods registered on EcoMark." },
            { logId: "log_8", action: "report_submitted", companyId: "sunbake_uid", reportId: "rep_sun_q2", timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString(), detail: "Report submitted for Packaged Wheat Flour (2024-Q2)." },
            { logId: "log_9", action: "report_submitted", companyId: "sunbake_uid", reportId: "rep_sun_q3", timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString(), detail: "Report submitted for Packaged Wheat Flour (2024-Q3)." },
        ];

        localStorage.setItem('ecomark_users', JSON.stringify(users));
        localStorage.setItem('ecomark_products', JSON.stringify(products));
        localStorage.setItem('ecomark_reports', JSON.stringify(reports));
        localStorage.setItem('ecomark_ecoCoinsHistory', JSON.stringify(ecoCoinsHistory));
        localStorage.setItem('ecomark_auditLogs', JSON.stringify(auditLogs));
        localStorage.setItem('ecomark_db_initialized_v2', 'true');
    }
}

// Call initDB immediately
initDB();

// Database Helper functions
const DB = {
    getUsers: () => JSON.parse(localStorage.getItem('ecomark_users') || '{}'),
    saveUsers: (users) => localStorage.setItem('ecomark_users', JSON.stringify(users)),
    
    getProducts: () => JSON.parse(localStorage.getItem('ecomark_products') || '{}'),
    saveProducts: (products) => localStorage.setItem('ecomark_products', JSON.stringify(products)),
    
    getReports: () => JSON.parse(localStorage.getItem('ecomark_reports') || '{}'),
    saveReports: (reports) => localStorage.setItem('ecomark_reports', JSON.stringify(reports)),
    
    getEcoCoinsHistory: () => JSON.parse(localStorage.getItem('ecomark_ecoCoinsHistory') || '{}'),
    saveEcoCoinsHistory: (history) => localStorage.setItem('ecomark_ecoCoinsHistory', JSON.stringify(history)),
    
    getAuditLogs: () => JSON.parse(localStorage.getItem('ecomark_auditLogs') || '[]'),
    saveAuditLogs: (logs) => localStorage.setItem('ecomark_auditLogs', JSON.stringify(logs)),

    // User Session
    getCurrentUser: () => {
        const email = sessionStorage.getItem('ecomark_current_user_email');
        if (!email) return null;
        const users = DB.getUsers();
        return Object.values(users).find(u => u.email === email) || null;
    },

    login: (email, password) => {
        const users = DB.getUsers();
        const user = Object.values(users).find(u => u.email === email && u.password === password);
        if (user) {
            sessionStorage.setItem('ecomark_current_user_email', email);
            return { success: true, user };
        }
        return { success: false, message: "Invalid email or password." };
    },

    register: (companyName, email, password, industry, location) => {
        const users = DB.getUsers();
        if (Object.values(users).some(u => u.email === email)) {
            return { success: false, message: "Email already exists." };
        }
        const uid = 'uid_' + Math.random().toString(36).substr(2, 9);
        const newUser = {
            uid,
            email,
            password,
            role: "company",
            companyName,
            industry,
            location,
            ecoCoins: COIN_TRIGGERS.REGISTER, // Credited +100 immediately
        };
        users[uid] = newUser;
        DB.saveUsers(users);

        // Record Coins
        DB.addCoinsHistory(uid, "Registration Reward", COIN_TRIGGERS.REGISTER);

        // Record Audit log
        DB.addAuditLog("company_registered", uid, null, `${companyName} registered on EcoMark.`);

        // Login automatically
        sessionStorage.setItem('ecomark_current_user_email', email);

        return { success: true, user: newUser };
    },

    logout: () => {
        sessionStorage.removeItem('ecomark_current_user_email');
        window.location.href = '../login.html';
    },

    // Fuel Submission & Scoring
    calculateCarbon: (fuelEntries, batchSize) => {
        let totalCO2e = 0;
        fuelEntries.forEach(entry => {
            const factor = EMISSION_FACTORS[entry.fuel_type] || 0;
            totalCO2e += entry.quantity * factor;
        });
        const co2ePerUnit = totalCO2e / batchSize;
        let score = "D";
        let ratingColor = "#B71C1C";
        let ratingLabel = "Very High";

        if (co2ePerUnit <= 0.5) {
            score = "A+";
            ratingColor = "#1B5E20";
            ratingLabel = "Ultra Green";
        } else if (co2ePerUnit <= 2.0) {
            score = "A";
            ratingColor = "#388E3C";
            ratingLabel = "Green";
        } else if (co2ePerUnit <= 5.0) {
            score = "B";
            ratingColor = "#F9A825";
            ratingLabel = "Moderate";
        } else if (co2ePerUnit <= 10.0) {
            score = "C";
            ratingColor = "#E65100";
            ratingLabel = "High";
        }

        return {
            totalCO2e: parseFloat(totalCO2e.toFixed(2)),
            co2ePerUnit: parseFloat(co2ePerUnit.toFixed(4)),
            score,
            ratingColor,
            ratingLabel
        };
    },

    submitReport: (companyId, productName, category, period, fuelEntries, batchSize) => {
        const users = DB.getUsers();
        const user = users[companyId];
        if (!user) return { success: false, message: "Company not found." };

        // 1. Calculate carbon metrics
        const calc = DB.calculateCarbon(fuelEntries, batchSize);

        // 2. Find or Create Product
        const products = DB.getProducts();
        let product = Object.values(products).find(p => p.companyId === companyId && p.productName.toLowerCase() === productName.toLowerCase());
        
        let isFirstReport = false;
        let productId;
        if (!product) {
            isFirstReport = true;
            productId = 'prod_' + Math.random().toString(36).substr(2, 9);
            product = {
                productId,
                companyId,
                productName,
                category,
                latestScore: calc.score,
                latestCO2ePerUnit: calc.co2ePerUnit,
                reportHistory: []
            };
        } else {
            productId = product.productId;
            product.latestScore = calc.score;
            product.latestCO2ePerUnit = calc.co2ePerUnit;
        }

        // 3. Save new report
        const reports = DB.getReports();
        const reportId = 'rep_' + Math.random().toString(36).substr(2, 9);
        const newReport = {
            reportId,
            companyId,
            productId,
            period,
            fuelEntries,
            batchSize,
            totalCO2e: calc.totalCO2e,
            co2ePerUnit: calc.co2ePerUnit,
            score: calc.score,
            submittedAt: new Date().toISOString()
        };
        reports[reportId] = newReport;
        DB.saveReports(reports);

        // Link report to product
        product.reportHistory.push(reportId);
        products[productId] = product;
        DB.saveProducts(products);

        // 4. Eco-Coins Calculation
        let coinsEarned = 0;
        const reasons = [];

        // Check first report on platform
        const companyReports = Object.values(reports).filter(r => r.companyId === companyId);
        if (companyReports.length === 1) {
            coinsEarned += COIN_TRIGGERS.FIRST_REPORT; // +200
            reasons.push("First Fuel Report Bonus (+200)");
        }

        // On-Time Submission
        coinsEarned += COIN_TRIGGERS.ON_TIME; // +50
        reasons.push("On-Time Report Submission (+50)");

        // High Score
        if (calc.score === "A" || calc.score === "A+") {
            coinsEarned += COIN_TRIGGERS.SCORE_A_OR_APLUS; // +300
            reasons.push(`Rating ${calc.score} Achieved (+300)`);
        }

        // Reduction compared to previous quarter
        if (product.reportHistory.length > 1) {
            const prevReportId = product.reportHistory[product.reportHistory.length - 2];
            const prevReport = reports[prevReportId];
            if (prevReport) {
                const prevCo2 = prevReport.co2ePerUnit;
                const reduction = (prevCo2 - calc.co2ePerUnit) / prevCo2;
                if (reduction >= 0.25) {
                    coinsEarned += COIN_TRIGGERS.REDUCTION_25; // +1000
                    reasons.push(`25%+ Carbon Reduction Achieved: ${Math.round(reduction * 100)}% decrease (+1000)`);
                } else if (reduction >= 0.10) {
                    coinsEarned += COIN_TRIGGERS.REDUCTION_10; // +500
                    reasons.push(`10%+ Carbon Reduction Achieved: ${Math.round(reduction * 100)}% decrease (+500)`);
                }
            }
        }

        // Apply Coins
        user.ecoCoins = (user.ecoCoins || 0) + coinsEarned;
        users[companyId] = user;
        DB.saveUsers(users);

        // Record history
        if (coinsEarned > 0) {
            reasons.forEach(reason => {
                DB.addCoinsHistory(companyId, reason, coinsEarned / reasons.length);
            });
        }

        // 5. Add Audit Log
        DB.addAuditLog("report_submitted", companyId, reportId, `Report submitted for ${productName} for period ${period}. Total CO2e: ${calc.totalCO2e} kg.`);

        return {
            success: true,
            reportId,
            productId,
            totalCO2e: calc.totalCO2e,
            co2ePerUnit: calc.co2ePerUnit,
            score: calc.score,
            coinsEarned
        };
    },

    addCoinsHistory: (companyId, trigger, amount) => {
        const history = DB.getEcoCoinsHistory();
        const id = 'coins_' + Math.random().toString(36).substr(2, 9);
        history[id] = {
            id,
            companyId,
            trigger,
            amount,
            timestamp: new Date().toISOString()
        };
        DB.saveEcoCoinsHistory(history);
    },

    addAuditLog: (action, companyId, reportId, detail) => {
        const logs = DB.getAuditLogs();
        logs.unshift({
            logId: 'log_' + Math.random().toString(36).substr(2, 9),
            action,
            companyId,
            reportId,
            timestamp: new Date().toISOString(),
            detail
        });
        DB.saveAuditLogs(logs);
    }
};

// Expose DB to global scope so that all pages can use it
window.DB = DB;
window.EMISSION_FACTORS = EMISSION_FACTORS;
window.COIN_TRIGGERS = COIN_TRIGGERS;
