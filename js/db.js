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
    if (!localStorage.getItem('ecomark_db_initialized_v5')) {
        localStorage.removeItem('ecomark_users');
        localStorage.removeItem('ecomark_products');
        localStorage.removeItem('ecomark_reports');
        localStorage.removeItem('ecomark_ecoCoinsHistory');
        localStorage.removeItem('ecomark_auditLogs');
        localStorage.removeItem('ecomark_db_initialized_v2');
        localStorage.removeItem('ecomark_db_initialized_v3');
        localStorage.removeItem('ecomark_db_initialized_v4');

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
                industry: "Steel Manufacturing",
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
            "bharat_steel_uid": {
                uid: "bharat_steel_uid",
                email: "company4@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Bharat Steel Works",
                industry: "Steel Manufacturing",
                location: "Nagpur",
                ecoCoins: 900
            },
            "surat_fab_uid": {
                uid: "surat_fab_uid",
                email: "company5@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Surat Fab Co.",
                industry: "Textile",
                location: "Surat",
                ecoCoins: 1200
            },
            "golden_grains_ltd_uid": {
                uid: "golden_grains_ltd_uid",
                email: "company6@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Golden Grains Ltd.",
                industry: "Food Processing",
                location: "Indore",
                ecoCoins: 700
            },
            "shakti_steel_uid": {
                uid: "shakti_steel_uid",
                email: "company7@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Shakti Steel Ltd",
                industry: "Manufacturing",
                location: "Mumbai",
                ecoCoins: 500
            },
            "golden_grains_uid": {
                uid: "golden_grains_uid",
                email: "company8@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Golden Grains Co",
                industry: "Food Processing",
                location: "Amritsar",
                ecoCoins: 600
            },
            "apex_steel_uid": {
                uid: "apex_steel_uid",
                email: "company9@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Apex Steel Ind.",
                industry: "Steel Manufacturing",
                location: "Jamshedpur",
                ecoCoins: 800
            },
            "deccan_alloys_uid": {
                uid: "deccan_alloys_uid",
                email: "company10@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Deccan Alloys",
                industry: "Steel Manufacturing",
                location: "Hyderabad",
                ecoCoins: 950
            },
            "lion_iron_uid": {
                uid: "lion_iron_uid",
                email: "company11@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Lion Iron & Steel",
                industry: "Steel Manufacturing",
                location: "Bellary",
                ecoCoins: 1100
            },
            "vardhman_steels_uid": {
                uid: "vardhman_steels_uid",
                email: "company12@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Vardhman Steels",
                industry: "Steel Manufacturing",
                location: "Ludhiana",
                ecoCoins: 650
            },
            "indus_weaves_uid": {
                uid: "indus_weaves_uid",
                email: "company13@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Indus Weaves Co.",
                industry: "Textile",
                location: "Coimbatore",
                ecoCoins: 1300
            },
            "silk_route_uid": {
                uid: "silk_route_uid",
                email: "company14@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Silk Route Fabrics",
                industry: "Textile",
                location: "Bhagalpur",
                ecoCoins: 750
            },
            "yarn_loom_uid": {
                uid: "yarn_loom_uid",
                email: "company15@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Yarn & Loom Corp.",
                industry: "Textile",
                location: "Ahmedabad",
                ecoCoins: 1400
            },
            "kora_cotton_uid": {
                uid: "kora_cotton_uid",
                email: "company16@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Kora Cotton Mills",
                industry: "Textile",
                location: "Madurai",
                ecoCoins: 900
            },
            "silver_flour_uid": {
                uid: "silver_flour_uid",
                email: "company17@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Silver Flour Mills",
                industry: "Food Processing",
                location: "Bhopal",
                ecoCoins: 850
            },
            "annapurna_grains_uid": {
                uid: "annapurna_grains_uid",
                email: "company18@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Annapurna Grains",
                industry: "Food Processing",
                location: "Varanasi",
                ecoCoins: 1250
            },
            "narmada_agro_uid": {
                uid: "narmada_agro_uid",
                email: "company19@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Narmada Agro Foods",
                industry: "Food Processing",
                location: "Jabalpur",
                ecoCoins: 700
            },
            "royal_chakki_uid": {
                uid: "royal_chakki_uid",
                email: "company20@ecomark.com",
                password: "company123",
                role: "company",
                companyName: "Royal Chakki Mills",
                industry: "Food Processing",
                location: "Kota",
                ecoCoins: 900
            }
        };

        const products = {
            "prod_ravi_steel": {
                productId: "prod_ravi_steel",
                companyId: "ravi_steel_uid",
                productName: "Steel Rod Grade-60",
                category: "Steel Rod",
                latestScore: "C",
                latestCO2ePerUnit: 5.256,
                reportHistory: ["rep_ravi_q2", "rep_ravi_q3"]
            },
            "prod_greenwave_textiles": {
                productId: "prod_greenwave_textiles",
                companyId: "greenwave_uid",
                productName: "Cotton Fabric Roll",
                category: "Cotton Fabric",
                latestScore: "A",
                latestCO2ePerUnit: 1.022,
                reportHistory: ["rep_green_q2", "rep_green_q3"]
            },
            "prod_sunbake_foods": {
                productId: "prod_sunbake_foods",
                companyId: "sunbake_uid",
                productName: "Packaged Wheat Flour",
                category: "Packaged Flour",
                latestScore: "A+",
                latestCO2ePerUnit: 0.1575,
                reportHistory: ["rep_sun_q2", "rep_sun_q3"]
            },
            "prod_bharat_steel": {
                productId: "prod_bharat_steel",
                companyId: "bharat_steel_uid",
                productName: "Structural Steel Rod",
                category: "Steel Rod",
                latestScore: "C",
                latestCO2ePerUnit: 6.08,
                reportHistory: ["rep_bharat_q2", "rep_bharat_q3"]
            },
            "prod_surat_fab": {
                productId: "prod_surat_fab",
                companyId: "surat_fab_uid",
                productName: "Organic Cotton Fabric",
                category: "Cotton Fabric",
                latestScore: "A",
                latestCO2ePerUnit: 1.104,
                reportHistory: ["rep_surat_q2", "rep_surat_q3"]
            },
            "prod_golden_grains_ltd": {
                productId: "prod_golden_grains_ltd",
                companyId: "golden_grains_ltd_uid",
                productName: "Premium Packaged Flour",
                category: "Packaged Flour",
                latestScore: "B",
                latestCO2ePerUnit: 3.5667,
                reportHistory: ["rep_golden_ltd_q2", "rep_golden_ltd_q3"]
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
            },
            "prod_apex_steel": {
                productId: "prod_apex_steel",
                companyId: "apex_steel_uid",
                productName: "Reinforced Steel Rod",
                category: "Steel Rod",
                latestScore: "B",
                latestCO2ePerUnit: 4.7833,
                reportHistory: ["rep_apex_q2", "rep_apex_q3"]
            },
            "prod_deccan_alloys": {
                productId: "prod_deccan_alloys",
                companyId: "deccan_alloys_uid",
                productName: "Deccan TMT Steel Rod",
                category: "Steel Rod",
                latestScore: "B",
                latestCO2ePerUnit: 3.892,
                reportHistory: ["rep_deccan_q2", "rep_deccan_q3"]
            },
            "prod_lion_steel": {
                productId: "prod_lion_steel",
                companyId: "lion_iron_uid",
                productName: "Lion High-Tensile Rod",
                category: "Steel Rod",
                latestScore: "A",
                latestCO2ePerUnit: 1.8427,
                reportHistory: ["rep_lion_q2", "rep_lion_q3"]
            },
            "prod_vardhman_steel": {
                productId: "prod_vardhman_steel",
                companyId: "vardhman_steels_uid",
                productName: "Vardhman Mild Steel Rod",
                category: "Steel Rod",
                latestScore: "C",
                latestCO2ePerUnit: 6.74,
                reportHistory: ["rep_vardhman_q2", "rep_vardhman_q3"]
            },
            "prod_indus_weaves": {
                productId: "prod_indus_weaves",
                companyId: "indus_weaves_uid",
                productName: "Indus Premium Cotton Fabric",
                category: "Cotton Fabric",
                latestScore: "A",
                latestCO2ePerUnit: 0.8856,
                reportHistory: ["rep_indus_q2", "rep_indus_q3"]
            },
            "prod_silk_route": {
                productId: "prod_silk_route",
                companyId: "silk_route_uid",
                productName: "Silk-Cotton Blend Fabric",
                category: "Cotton Fabric",
                latestScore: "B",
                latestCO2ePerUnit: 2.4552,
                reportHistory: ["rep_silk_q2", "rep_silk_q3"]
            },
            "prod_yarn_loom": {
                productId: "prod_yarn_loom",
                companyId: "yarn_loom_uid",
                productName: "Pure combed Cotton Fabric",
                category: "Cotton Fabric",
                latestScore: "A+",
                latestCO2ePerUnit: 0.451,
                reportHistory: ["rep_yarn_q2", "rep_yarn_q3"]
            },
            "prod_kora_cotton": {
                productId: "prod_kora_cotton",
                companyId: "kora_cotton_uid",
                productName: "Kora Handloom Cotton Fabric",
                category: "Cotton Fabric",
                latestScore: "A",
                latestCO2ePerUnit: 1.2484,
                reportHistory: ["rep_kora_q2", "rep_kora_q3"]
            },
            "prod_silver_flour": {
                productId: "prod_silver_flour",
                companyId: "silver_flour_uid",
                productName: "Silver Sharbati Flour",
                category: "Packaged Flour",
                latestScore: "A",
                latestCO2ePerUnit: 1.6442,
                reportHistory: ["rep_silver_q2", "rep_silver_q3"]
            },
            "prod_annapurna_grains": {
                productId: "prod_annapurna_grains",
                companyId: "annapurna_grains_uid",
                productName: "Annapurna Organic Atta",
                category: "Packaged Flour",
                latestScore: "A+",
                latestCO2ePerUnit: 0.3854,
                reportHistory: ["rep_annapurna_q2", "rep_annapurna_q3"]
            },
            "prod_narmada_agro": {
                productId: "prod_narmada_agro",
                companyId: "narmada_agro_uid",
                productName: "Narmada Agro Flour",
                category: "Packaged Flour",
                latestScore: "B",
                latestCO2ePerUnit: 2.934,
                reportHistory: ["rep_narmada_q2", "rep_narmada_q3"]
            },
            "prod_royal_chakki": {
                productId: "prod_royal_chakki",
                companyId: "royal_chakki_uid",
                productName: "Royal Whole Wheat Flour",
                category: "Packaged Flour",
                latestScore: "A",
                latestCO2ePerUnit: 1.1468,
                reportHistory: ["rep_royal_q2", "rep_royal_q3"]
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
            "rep_bharat_q2": {
                reportId: "rep_bharat_q2",
                companyId: "bharat_steel_uid",
                productId: "prod_bharat_steel",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 1200, unit: "liters" },
                    { fuel_type: "coal", quantity: 500, unit: "kg" }
                ],
                batchSize: 600,
                totalCO2e: 4426.0,
                co2ePerUnit: 7.3767,
                score: "C",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_bharat_q3": {
                reportId: "rep_bharat_q3",
                companyId: "bharat_steel_uid",
                productId: "prod_bharat_steel",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 1000, unit: "liters" },
                    { fuel_type: "coal", quantity: 400, unit: "kg" }
                ],
                batchSize: 600,
                totalCO2e: 3648.0,
                co2ePerUnit: 6.08,
                score: "C",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_surat_q2": {
                reportId: "rep_surat_q2",
                companyId: "surat_fab_uid",
                productId: "prod_surat_fab",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 800, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 400, unit: "m3" }
                ],
                batchSize: 1000,
                totalCO2e: 1472.0,
                co2ePerUnit: 1.472,
                score: "A",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_surat_q3": {
                reportId: "rep_surat_q3",
                companyId: "surat_fab_uid",
                productId: "prod_surat_fab",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 600, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 300, unit: "m3" }
                ],
                batchSize: 1000,
                totalCO2e: 1104.0,
                co2ePerUnit: 1.104,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_golden_ltd_q2": {
                reportId: "rep_golden_ltd_q2",
                companyId: "golden_grains_ltd_uid",
                productId: "prod_golden_grains_ltd",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 1500, unit: "liters" },
                    { fuel_type: "biomass", quantity: 1000, unit: "kg" }
                ],
                batchSize: 600,
                totalCO2e: 2675.0,
                co2ePerUnit: 4.4583,
                score: "B",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_golden_ltd_q3": {
                reportId: "rep_golden_ltd_q3",
                companyId: "golden_grains_ltd_uid",
                productId: "prod_golden_grains_ltd",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 1200, unit: "liters" },
                    { fuel_type: "biomass", quantity: 800, unit: "kg" }
                ],
                batchSize: 600,
                totalCO2e: 2140.0,
                co2ePerUnit: 3.5667,
                score: "B",
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
            },
            "rep_apex_q2": {
                reportId: "rep_apex_q2",
                companyId: "apex_steel_uid",
                productId: "prod_apex_steel",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 1000, unit: "liters" },
                    { fuel_type: "coal", quantity: 300, unit: "kg" }
                ],
                batchSize: 600,
                totalCO2e: 3406.0,
                co2ePerUnit: 5.6767,
                score: "C",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_apex_q3": {
                reportId: "rep_apex_q3",
                companyId: "apex_steel_uid",
                productId: "prod_apex_steel",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 800, unit: "liters" },
                    { fuel_type: "coal", quantity: 300, unit: "kg" }
                ],
                batchSize: 600,
                totalCO2e: 2870.0,
                co2ePerUnit: 4.7833,
                score: "B",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_deccan_q2": {
                reportId: "rep_deccan_q2",
                companyId: "deccan_alloys_uid",
                productId: "prod_deccan_alloys",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 800, unit: "liters" },
                    { fuel_type: "electricity", quantity: 600, unit: "kWh" }
                ],
                batchSize: 600,
                totalCO2e: 2636.0,
                co2ePerUnit: 4.3933,
                score: "B",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_deccan_q3": {
                reportId: "rep_deccan_q3",
                companyId: "deccan_alloys_uid",
                productId: "prod_deccan_alloys",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "diesel", quantity: 700, unit: "liters" },
                    { fuel_type: "electricity", quantity: 560, unit: "kWh" }
                ],
                batchSize: 600,
                totalCO2e: 2335.2,
                co2ePerUnit: 3.892,
                score: "B",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_lion_q2": {
                reportId: "rep_lion_q2",
                companyId: "lion_iron_uid",
                productId: "prod_lion_steel",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1200, unit: "kWh" },
                    { fuel_type: "furnace_oil", quantity: 100, unit: "liters" }
                ],
                batchSize: 600,
                totalCO2e: 1299.0,
                co2ePerUnit: 2.165,
                score: "B",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_lion_q3": {
                reportId: "rep_lion_q3",
                companyId: "lion_iron_uid",
                productId: "prod_lion_steel",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1000, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 140, unit: "m3" }
                ],
                batchSize: 600,
                totalCO2e: 1105.6,
                co2ePerUnit: 1.8427,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_vardhman_q2": {
                reportId: "rep_vardhman_q2",
                companyId: "vardhman_steels_uid",
                productId: "prod_vardhman_steel",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "coal", quantity: 1500, unit: "kg" },
                    { fuel_type: "electricity", quantity: 800, unit: "kWh" }
                ],
                batchSize: 600,
                totalCO2e: 4286.0,
                co2ePerUnit: 7.1433,
                score: "C",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_vardhman_q3": {
                reportId: "rep_vardhman_q3",
                companyId: "vardhman_steels_uid",
                productId: "prod_vardhman_steel",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "coal", quantity: 1400, unit: "kg" },
                    { fuel_type: "electricity", quantity: 800, unit: "kWh" }
                ],
                batchSize: 600,
                totalCO2e: 4044.0,
                co2ePerUnit: 6.74,
                score: "C",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_indus_q2": {
                reportId: "rep_indus_q2",
                companyId: "indus_weaves_uid",
                productId: "prod_indus_weaves",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1000, unit: "kWh" },
                    { fuel_type: "biomass", quantity: 800, unit: "kg" }
                ],
                batchSize: 1000,
                totalCO2e: 1148.0,
                co2ePerUnit: 1.148,
                score: "A",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_indus_q3": {
                reportId: "rep_indus_q3",
                companyId: "indus_weaves_uid",
                productId: "prod_indus_weaves",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 800, unit: "kWh" },
                    { fuel_type: "biomass", quantity: 560, unit: "kg" }
                ],
                batchSize: 1000,
                totalCO2e: 885.6,
                co2ePerUnit: 0.8856,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_silk_q2": {
                reportId: "rep_silk_q2",
                companyId: "silk_route_uid",
                productId: "prod_silk_route",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 2000, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 560, unit: "m3" }
                ],
                batchSize: 1000,
                totalCO2e: 2782.4,
                co2ePerUnit: 2.7824,
                score: "B",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_silk_q3": {
                reportId: "rep_silk_q3",
                companyId: "silk_route_uid",
                productId: "prod_silk_route",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1800, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 480, unit: "m3" }
                ],
                batchSize: 1000,
                totalCO2e: 2455.2,
                co2ePerUnit: 2.4552,
                score: "B",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_yarn_q2": {
                reportId: "rep_yarn_q2",
                companyId: "yarn_loom_uid",
                productId: "prod_yarn_loom",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 500, unit: "kWh" },
                    { fuel_type: "biomass", quantity: 400, unit: "kg" }
                ],
                batchSize: 1000,
                totalCO2e: 574.0,
                co2ePerUnit: 0.574,
                score: "A",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_yarn_q3": {
                reportId: "rep_yarn_q3",
                companyId: "yarn_loom_uid",
                productId: "prod_yarn_loom",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 400, unit: "kWh" },
                    { fuel_type: "biomass", quantity: 300, unit: "kg" }
                ],
                batchSize: 1000,
                totalCO2e: 451.0,
                co2ePerUnit: 0.451,
                score: "A+",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_kora_q2": {
                reportId: "rep_kora_q2",
                companyId: "kora_cotton_uid",
                productId: "prod_kora_cotton",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1200, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 250, unit: "m3" }
                ],
                batchSize: 1000,
                totalCO2e: 1494.0,
                co2ePerUnit: 1.494,
                score: "A",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_kora_q3": {
                reportId: "rep_kora_q3",
                companyId: "kora_cotton_uid",
                productId: "prod_kora_cotton",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1000, unit: "kWh" },
                    { fuel_type: "natural_gas", quantity: 210, unit: "m3" }
                ],
                batchSize: 1000,
                totalCO2e: 1248.4,
                co2ePerUnit: 1.2484,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_silver_q2": {
                reportId: "rep_silver_q2",
                companyId: "silver_flour_uid",
                productId: "prod_silver_flour",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 1000, unit: "kWh" },
                    { fuel_type: "lpg", quantity: 160, unit: "liters" }
                ],
                batchSize: 500,
                totalCO2e: 1061.6,
                co2ePerUnit: 2.1232,
                score: "B",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_silver_q3": {
                reportId: "rep_silver_q3",
                companyId: "silver_flour_uid",
                productId: "prod_silver_flour",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "electricity", quantity: 800, unit: "kWh" },
                    { fuel_type: "lpg", quantity: 110, unit: "liters" }
                ],
                batchSize: 500,
                totalCO2e: 822.1,
                co2ePerUnit: 1.6442,
                score: "A",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_annapurna_q2": {
                reportId: "rep_annapurna_q2",
                companyId: "annapurna_grains_uid",
                productId: "prod_annapurna_grains",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "biomass", quantity: 200, unit: "kg" },
                    { fuel_type: "electricity", quantity: 200, unit: "kWh" }
                ],
                batchSize: 500,
                totalCO2e: 246.0,
                co2ePerUnit: 0.492,
                score: "A+",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_annapurna_q3": {
                reportId: "rep_annapurna_q3",
                companyId: "annapurna_grains_uid",
                productId: "prod_annapurna_grains",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "biomass", quantity: 150, unit: "kg" },
                    { fuel_type: "electricity", quantity: 160, unit: "kWh" }
                ],
                batchSize: 500,
                totalCO2e: 192.7,
                co2ePerUnit: 0.3854,
                score: "A+",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_narmada_q2": {
                reportId: "rep_narmada_q2",
                companyId: "narmada_agro_uid",
                productId: "prod_narmada_agro",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 800, unit: "liters" },
                    { fuel_type: "electricity", quantity: 600, unit: "kWh" }
                ],
                batchSize: 500,
                totalCO2e: 1700.0,
                co2ePerUnit: 3.40,
                score: "B",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_narmada_q3": {
                reportId: "rep_narmada_q3",
                companyId: "narmada_agro_uid",
                productId: "prod_narmada_agro",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 700, unit: "liters" },
                    { fuel_type: "electricity", quantity: 500, unit: "kWh" }
                ],
                batchSize: 500,
                totalCO2e: 1467.0,
                co2ePerUnit: 2.934,
                score: "B",
                submittedAt: new Date(Date.now() - 15*24*60*60*1000).toISOString()
            },
            "rep_royal_q2": {
                reportId: "rep_royal_q2",
                companyId: "royal_chakki_uid",
                productId: "prod_royal_chakki",
                period: "2024-Q2",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 400, unit: "liters" },
                    { fuel_type: "biomass", quantity: 250, unit: "kg" }
                ],
                batchSize: 500,
                totalCO2e: 706.5,
                co2ePerUnit: 1.413,
                score: "A",
                submittedAt: new Date(Date.now() - 45*24*60*60*1000).toISOString()
            },
            "rep_royal_q3": {
                reportId: "rep_royal_q3",
                companyId: "royal_chakki_uid",
                productId: "prod_royal_chakki",
                period: "2024-Q3",
                fuelEntries: [
                    { fuel_type: "lpg", quantity: 320, unit: "liters" },
                    { fuel_type: "biomass", quantity: 220, unit: "kg" }
                ],
                batchSize: 500,
                totalCO2e: 573.4,
                co2ePerUnit: 1.1468,
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

            "coins_bharat_1": { id: "coins_bharat_1", companyId: "bharat_steel_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString() },
            "coins_bharat_2": { id: "coins_bharat_2", companyId: "bharat_steel_uid", trigger: "First Fuel Report (2024-Q2)", amount: 200, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_bharat_3": { id: "coins_bharat_3", companyId: "bharat_steel_uid", trigger: "Fuel Report (2024-Q3)", amount: 50, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_bharat_4": { id: "coins_bharat_4", companyId: "bharat_steel_uid", trigger: "15%+ Carbon Footprint Reduction (Q3 vs Q2)", amount: 550, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },

            "coins_surat_1": { id: "coins_surat_1", companyId: "surat_fab_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString() },
            "coins_surat_2": { id: "coins_surat_2", companyId: "surat_fab_uid", trigger: "First Fuel Report (2024-Q2)", amount: 200, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_surat_3": { id: "coins_surat_3", companyId: "surat_fab_uid", trigger: "Rating A Achieved (2024-Q2)", amount: 300, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_surat_4": { id: "coins_surat_4", companyId: "surat_fab_uid", trigger: "Rating A Achieved (2024-Q3)", amount: 300, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_surat_5": { id: "coins_surat_5", companyId: "surat_fab_uid", trigger: "Fuel Report (2024-Q3)", amount: 50, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_surat_6": { id: "coins_surat_6", companyId: "surat_fab_uid", trigger: "25%+ Carbon Reduction Achieved", amount: 250, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },

            "coins_golden_ltd_1": { id: "coins_golden_ltd_1", companyId: "golden_grains_ltd_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString() },
            "coins_golden_ltd_2": { id: "coins_golden_ltd_2", companyId: "golden_grains_ltd_uid", trigger: "First Fuel Report (2024-Q2)", amount: 200, timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString() },
            "coins_golden_ltd_3": { id: "coins_golden_ltd_3", companyId: "golden_grains_ltd_uid", trigger: "Fuel Report (2024-Q3)", amount: 50, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },
            "coins_golden_ltd_4": { id: "coins_golden_ltd_4", companyId: "golden_grains_ltd_uid", trigger: "20%+ Carbon Reduction Achieved", amount: 350, timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString() },

            "coins_apex_1": { id: "coins_apex_1", companyId: "apex_steel_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_apex_2": { id: "coins_apex_2", companyId: "apex_steel_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_apex_3": { id: "coins_apex_3", companyId: "apex_steel_uid", trigger: "Carbon reduction bonus", amount: 500, timestamp: new Date().toISOString() },

            "coins_deccan_1": { id: "coins_deccan_1", companyId: "deccan_alloys_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_deccan_2": { id: "coins_deccan_2", companyId: "deccan_alloys_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_deccan_3": { id: "coins_deccan_3", companyId: "deccan_alloys_uid", trigger: "Carbon reduction bonus", amount: 650, timestamp: new Date().toISOString() },

            "coins_lion_1": { id: "coins_lion_1", companyId: "lion_iron_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_lion_2": { id: "coins_lion_2", companyId: "lion_iron_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_lion_3": { id: "coins_lion_3", companyId: "lion_iron_uid", trigger: "Grade A Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_lion_4": { id: "coins_lion_4", companyId: "lion_iron_uid", trigger: "Carbon reduction bonus", amount: 500, timestamp: new Date().toISOString() },

            "coins_vardhman_1": { id: "coins_vardhman_1", companyId: "vardhman_steels_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_vardhman_2": { id: "coins_vardhman_2", companyId: "vardhman_steels_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_vardhman_3": { id: "coins_vardhman_3", companyId: "vardhman_steels_uid", trigger: "On-time reporting", amount: 350, timestamp: new Date().toISOString() },

            "coins_indus_1": { id: "coins_indus_1", companyId: "indus_weaves_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_indus_2": { id: "coins_indus_2", companyId: "indus_weaves_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_indus_3": { id: "coins_indus_3", companyId: "indus_weaves_uid", trigger: "Grade A Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_indus_4": { id: "coins_indus_4", companyId: "indus_weaves_uid", trigger: "Carbon reduction bonus", amount: 700, timestamp: new Date().toISOString() },

            "coins_silk_1": { id: "coins_silk_1", companyId: "silk_route_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_silk_2": { id: "coins_silk_2", companyId: "silk_route_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_silk_3": { id: "coins_silk_3", companyId: "silk_route_uid", trigger: "Carbon reduction bonus", amount: 450, timestamp: new Date().toISOString() },

            "coins_yarn_1": { id: "coins_yarn_1", companyId: "yarn_loom_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_yarn_2": { id: "coins_yarn_2", companyId: "yarn_loom_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_yarn_3": { id: "coins_yarn_3", companyId: "yarn_loom_uid", trigger: "Grade A+ Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_yarn_4": { id: "coins_yarn_4", companyId: "yarn_loom_uid", trigger: "Carbon reduction bonus", amount: 800, timestamp: new Date().toISOString() },

            "coins_kora_1": { id: "coins_kora_1", companyId: "kora_cotton_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_kora_2": { id: "coins_kora_2", companyId: "kora_cotton_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_kora_3": { id: "coins_kora_3", companyId: "kora_cotton_uid", trigger: "Grade A Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_kora_4": { id: "coins_kora_4", companyId: "kora_cotton_uid", trigger: "Carbon reduction bonus", amount: 300, timestamp: new Date().toISOString() },

            "coins_silver_f_1": { id: "coins_silver_f_1", companyId: "silver_flour_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_silver_f_2": { id: "coins_silver_f_2", companyId: "silver_flour_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_silver_f_3": { id: "coins_silver_f_3", companyId: "silver_flour_uid", trigger: "Grade A Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_silver_f_4": { id: "coins_silver_f_4", companyId: "silver_flour_uid", trigger: "Carbon reduction bonus", amount: 250, timestamp: new Date().toISOString() },

            "coins_anna_1": { id: "coins_anna_1", companyId: "annapurna_grains_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_anna_2": { id: "coins_anna_2", companyId: "annapurna_grains_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_anna_3": { id: "coins_anna_3", companyId: "annapurna_grains_uid", trigger: "Grade A+ Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_anna_4": { id: "coins_anna_4", companyId: "annapurna_grains_uid", trigger: "Carbon reduction bonus", amount: 650, timestamp: new Date().toISOString() },

            "coins_narmada_1": { id: "coins_narmada_1", companyId: "narmada_agro_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_narmada_2": { id: "coins_narmada_2", companyId: "narmada_agro_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_narmada_3": { id: "coins_narmada_3", companyId: "narmada_agro_uid", trigger: "Carbon reduction bonus", amount: 400, timestamp: new Date().toISOString() },

            "coins_royal_1": { id: "coins_royal_1", companyId: "royal_chakki_uid", trigger: "Registration Reward", amount: 100, timestamp: new Date().toISOString() },
            "coins_royal_2": { id: "coins_royal_2", companyId: "royal_chakki_uid", trigger: "First Fuel Report", amount: 200, timestamp: new Date().toISOString() },
            "coins_royal_3": { id: "coins_royal_3", companyId: "royal_chakki_uid", trigger: "Grade A Achieved", amount: 300, timestamp: new Date().toISOString() },
            "coins_royal_4": { id: "coins_royal_4", companyId: "royal_chakki_uid", trigger: "Carbon reduction bonus", amount: 300, timestamp: new Date().toISOString() }
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

            { logId: "log_10", action: "company_registered", companyId: "bharat_steel_uid", timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString(), detail: "Bharat Steel Works registered on EcoMark." },
            { logId: "log_11", action: "report_submitted", companyId: "bharat_steel_uid", reportId: "rep_bharat_q2", timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString(), detail: "Report submitted for Structural Steel Rod (2024-Q2)." },
            { logId: "log_12", action: "report_submitted", companyId: "bharat_steel_uid", reportId: "rep_bharat_q3", timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString(), detail: "Report submitted for Structural Steel Rod (2024-Q3)." },

            { logId: "log_13", action: "company_registered", companyId: "surat_fab_uid", timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString(), detail: "Surat Fab Co. registered on EcoMark." },
            { logId: "log_14", action: "report_submitted", companyId: "surat_fab_uid", reportId: "rep_surat_q2", timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString(), detail: "Report submitted for Organic Cotton Fabric (2024-Q2)." },
            { logId: "log_15", action: "report_submitted", companyId: "surat_fab_uid", reportId: "rep_surat_q3", timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString(), detail: "Report submitted for Organic Cotton Fabric (2024-Q3)." },

            { logId: "log_16", action: "company_registered", companyId: "golden_grains_ltd_uid", timestamp: new Date(Date.now() - 60*24*60*60*1000).toISOString(), detail: "Golden Grains Ltd. registered on EcoMark." },
            { logId: "log_17", action: "report_submitted", companyId: "golden_grains_ltd_uid", reportId: "rep_golden_ltd_q2", timestamp: new Date(Date.now() - 45*24*60*60*1000).toISOString(), detail: "Report submitted for Premium Packaged Flour (2024-Q2)." },
            { logId: "log_18", action: "report_submitted", companyId: "golden_grains_ltd_uid", reportId: "rep_golden_ltd_q3", timestamp: new Date(Date.now() - 15*24*60*60*1000).toISOString(), detail: "Report submitted for Premium Packaged Flour (2024-Q3)." }
        ];

        localStorage.setItem('ecomark_users', JSON.stringify(users));
        localStorage.setItem('ecomark_products', JSON.stringify(products));
        localStorage.setItem('ecomark_reports', JSON.stringify(reports));
        localStorage.setItem('ecomark_ecoCoinsHistory', JSON.stringify(ecoCoinsHistory));
        localStorage.setItem('ecomark_auditLogs', JSON.stringify(auditLogs));
        localStorage.setItem('ecomark_db_initialized_v5', 'true');
        console.log("EcoMark DB v5 initialized with 20 comparable products!");
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
