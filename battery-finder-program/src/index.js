// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

// console.log(battery);
// console.log(camera);

const cameraBrand = document.getElementById("cameraBrand");
const cameraModel = document.getElementById("cameraModel");
const accessory = document.getElementById("accessory");
const usableBattery = document.getElementById("battery");

cameraBrand.addEventListener("change", function() {
    updateCameraModel(cameraBrand.value);
    let totalWh = parseFloat(getElementSelectedOption().dataset.powerConsumptionWh) + parseFloat(accessory.value);
    let batteryArr = getSortedUsableBatteryArr(totalWh);
    updateBatteryList(batteryArr, totalWh);
});

cameraModel.addEventListener("change", function() {    
    let totalWh = parseFloat(getElementSelectedOption().dataset.powerConsumptionWh) + parseFloat(accessory.value);
    let batteryArr = getSortedUsableBatteryArr(totalWh);
    updateBatteryList(batteryArr, totalWh);
});

accessory.addEventListener("change", function() {
    let totalWh = parseFloat(getElementSelectedOption().dataset.powerConsumptionWh) + parseFloat(accessory.value);
    let batteryArr = getSortedUsableBatteryArr(totalWh);
    updateBatteryList(batteryArr, totalWh);
})

// カメラのモデルリスト更新
function updateCameraModel(brand) {
    cameraModel.innerHTML = "";
    for (let i = 0; i < camera.length; i++) {
        if (camera[i].brand === brand) {
            cameraModel.innerHTML += `
            <option data-power-consumption-wh="${camera[i].powerConsumptionWh}">${camera[i].model}</option>
            `;
        }
    };
}

// 選択されたカメラモデルの要素を取得
function getElementSelectedOption() {
    for (i = 0; i < cameraModel.options.length; i++) {
        if (cameraModel.options[i].selected) {
            return cameraModel.options[i];
        }
    }
}

// ソートされた対象バッテリーの配列を取得
function getSortedUsableBatteryArr(totalWh) {
    let usableBatteryArr = [];

    for (let i = 0; i < battery.length; i++) {
        let maxDischargePower = battery[i].maxDraw * battery[i].endVoltage;

        if (totalWh <= maxDischargePower) {
            usableBatteryArr.push(battery[i].batteryName);
        }
    }

    return usableBatteryArr.sort();
}

// バッテリーリストの更新
function updateBatteryList(batteryArray, totalWh) {
    usableBattery.innerHTML = "";

    for (let i = 0; i < batteryArray.length; i++) {
        let batteryData = battery.find(element => element.batteryName === batteryArray[i]);
        
        usableBattery.innerHTML += `
        <div class="col-12 d-flex justify-content-between bg-light border p-0">
            <p class="m-2 font-weight-bold">${batteryData.batteryName}</p>
            <p class="m-2">Estimate ${((batteryData.voltage * batteryData.capacityAh) / totalWh).toFixed(1)} hours</p>
        </div>
        `;
    }
}

// 初期化
let current = "";
for (let i = 0; i < camera.length; i++) {
    if (camera[i].brand !== current) {
        current = camera[i].brand;
        cameraBrand.innerHTML += `
        <option>${camera[i].brand}</option>
        `;
    }
};
updateCameraModel(cameraBrand.value);
let totalWh = parseFloat(getElementSelectedOption().dataset.powerConsumptionWh) + parseFloat(accessory.value);
let batteryArr = getSortedUsableBatteryArr(totalWh);
updateBatteryList(batteryArr, totalWh);

