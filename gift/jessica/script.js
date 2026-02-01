// 礼物数据
const gifts = [
    {
        name: "大疆 Pocket 3",
        description: "愿它为你捕捉岁月里的温柔瞬间，记录每一帧闪闪发光的生活。",
        color: "#0099FF",
        image: "img/1.jpg"
    },
    {
        name: "泡泡玛特盲盒",
        description: "愿你的生活充满惊喜与可爱。",
        color: "#FF6600",
        image: "img/2.jpg"
    },
    {
        name: "幸运红包",
        description: "愿福气与财运常伴你左右，每一天都收获满满。",
        color: "#CC0000",
        image: "img/4.jpg"
    },
    {
        name: "护肤品套装",
        description: "愿你年年十八，每天都能遇见最美的自己。",
        color: "#7851e0",
        image: "img/3.jpg"
    },
    {
        name: "豪华晚餐",
        description: "愿美味串联起欢笑与温情，与亲友共享美好时光。",
        color: "#003399",
        image: "img/5.jpg"
    },
    {
        name: "石化油卡",
        description: "愿每一次出发都奔向热爱，沿途皆是风景，归来总有收获。",
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
let targetIndex = 0;
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
    } else {
        if (targetIndex == 0) {
            //避免连续抽到相同的礼物
            targetIndex = targetIndex + 1;
            targetAngle = targetIndex * 60;
        }
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