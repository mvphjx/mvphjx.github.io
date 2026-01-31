// 礼物数据
const gifts = [
    {
        name: "Vlog神器",
        description: "DJI Pocket 3，记录生活中精彩的每一刻，生日快乐！",
        color: "#0099FF",
        image: "img/1.jpg"
    },
    {
        name: "泡泡玛特",
        description: "泡泡玛特盲盒，愿你的生活充满可爱与惊喜，生日快乐！",
        color: "#FF6600",
        image: "img/2.jpg"
    },
    {
        name: "幸运红包",
        description: "现金红包，愿财源广进，好运连连，生日快乐！",
        color: "#CC0000",
        image: "img/4.jpg"
    },
    {
        name: "护肤品",
        description: "护肤品套装，愿你每天都能展现最美的自己，生日快乐！",
        color: "#7851e0",
        image: "img/3.jpg"
    },

    {
        name: "豪华晚餐",
        description: "与朋友一起享受美食与美好时光！唯有爱与美食，不可辜负，生日快乐！",
        color: "#003399",
        image: "img/5.jpg"
    },
    {
        name: "加油卡",
        description: "石化油卡，一路顺风，旅途平安，生日快乐！",
        color: "#8bc99a",
        image: "img/6.jpg"
    }
];

// DOM元素
const welcomeScreen = document.getElementById('welcomeScreen');
const lotteryScreen = document.getElementById('lotteryScreen');
const resultScreen = document.getElementById('resultScreen');
const startDrawBtn = document.getElementById('startDraw');
const drawButton = document.getElementById('drawButton');
const turntable = document.getElementById('turntable');
const backHomeBtn = document.getElementById('backHome');
const backHomeBtn2 = document.getElementById('backHome2');
const drawAgainBtn = document.getElementById('drawAgain');
const giftImage = document.getElementById('giftImage');
const giftName = document.getElementById('giftName');
const giftDescription = document.getElementById('giftDescription');

// 当前旋转角度
let currentRotation = 0;
// 是否正在旋转
let isSpinning = false;

// 开始抽奖按钮点击事件
startDrawBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    lotteryScreen.style.display = 'flex';
    lotteryScreen.classList.add('fade-in');
});

// 返回首页按钮点击事件
const goBackHome = () => {
    lotteryScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    welcomeScreen.classList.add('fade-in');
};

backHomeBtn.addEventListener('click', goBackHome);
backHomeBtn2.addEventListener('click', goBackHome);

// 再次抽奖按钮点击事件
drawAgainBtn.addEventListener('click', () => {
    resultScreen.style.display = 'none';
    lotteryScreen.style.display = 'flex';
    lotteryScreen.classList.add('fade-in');
});

// 抽奖按钮点击事件
drawButton.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    // 随机角度 0-5
    let targetIndex = Math.floor(Math.random() * gifts.length);
    // 每个礼物占据60度（360/6）
    let targetAngle = targetIndex * 60;
    if (currentRotation == 0) {
        // 我们让指针指向对应礼物的中间位置
        targetAngle = targetAngle + 30;
    }
    // 计算需要旋转的总角度（当前角度 + 多转几圈 + 目标角度）
    const spinAngle = currentRotation + 360 * 2 + targetAngle;
    // 应用旋转动画
    turntable.style.transform = `rotate(${spinAngle}deg)`;
    // 更新当前旋转角度
    currentRotation = spinAngle;
    console.log("本次旋转动画", targetAngle, spinAngle)
    console.log("更新已经旋转角度", currentRotation, currentRotation % 360)
    // 计算角度对应的礼物
    let cRotation = currentRotation % 360 - 30 + 300;
    cRotation = 360 - cRotation % 360;
    let giftIndex = cRotation % 360 / 60
    const selectedGift = gifts[giftIndex];
    console.log("计算角度对应的礼物", giftIndex, selectedGift)
    // 5秒后显示抽奖结果
    setTimeout(() => {
        // 显示抽奖结果
        giftImage.src = selectedGift.image;
        giftName.textContent = selectedGift.name;
        giftName.style.color = selectedGift.color;
        giftDescription.textContent = selectedGift.description;
        // 切换到结果页面
        lotteryScreen.style.display = 'none';
        resultScreen.style.display = 'flex';
        resultScreen.classList.add('fade-in');
        isSpinning = false;
    }, 5000);
    // 添加旋转中的按钮状态
    drawButton.textContent = "抽奖中...";
    drawButton.disabled = true;
    drawButton.classList.remove('pulse');
    setTimeout(() => {
        drawButton.textContent = "开始抽奖";
        drawButton.disabled = false;
        drawButton.classList.add('pulse');
    }, 1000);
});

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    // 设置随机默认图片（如果Unsplash图片加载失败）
    setTimeout(() => {
        const images = document.querySelectorAll('.gift-image');
        images.forEach(img => {
            if (img.complete && img.naturalHeight === 0) {
                // 图片加载失败，使用备选颜色背景
                img.src = "";
                img.style.backgroundColor = "#0099FF";
                img.style.display = "flex";
                img.style.alignItems = "center";
                img.style.justifyContent = "center";
                img.innerHTML = '<span style="color: white; font-size: 1.2rem;">礼物图片</span>';
            }
        });
    }, 2000);
});