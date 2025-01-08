export const initLoginAnimation = (): void => {
    // 選擇元素並加上類型註解
    let usernameRef: HTMLInputElement | null = document.getElementById("username") as HTMLInputElement;
    let passwordRef: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement;
    let eyeL: HTMLElement | null = document.querySelector(".eyeball_left");
    let eyeR: HTMLElement | null = document.querySelector(".eyeball_right");
    let handL: HTMLElement | null = document.querySelector(".hand_left");
    let handR: HTMLElement | null = document.querySelector(".hand_right");

    // 目光樣式設置
    let normalEyeStyle = (): void => {
        if (eyeL && eyeR) {
            eyeL.style.cssText = `
                left: 0.6em;
                top: 0.6em;
            `;
            eyeR.style.cssText = `
                right: 0.6em;
                top: 0.6em;
            `;
        }
    };

    // 手部樣式設置
    let normalHandStyle = (): void => {
        if (handL && handR) {
            handL.style.cssText = `
                height: 2.81em;
                top: 8.4em;
                left: 7.5em;
                transform: rotate(0deg);
            `;
            handR.style.cssText = `
                height: 2.81em;
                top: 8.4em;
                right: 7.5em;
                transform: rotate(0deg);
            `;
        }
    };

    // 當聚焦到用戶名輸入框時
    usernameRef?.addEventListener("focus", (): void => {
        if (eyeL && eyeR) {
            eyeL.style.cssText = `
                left: 0.75em;
                top: 1.12em;  
            `;
            eyeR.style.cssText = `
                right: 0.75em;
                top: 1.12em;
            `;
        }
        normalHandStyle();
    });

    // 當聚焦到密碼輸入框時
    passwordRef?.addEventListener("focus", (): void => {
        if (handL && handR) {
            handL.style.cssText = `
                height: 6.56em;
                top: 3.87em;
                left: 11.75em;
                transform: rotate(-155deg);    
            `;
            handR.style.cssText = `
                height: 6.56em;
                top: 3.87em;
                right: 11.75em;
                transform: rotate(155deg);
            `;
        }
        normalEyeStyle();
    });

    // 當點擊其他地方時，重置樣式
    document.addEventListener("click", (e: MouseEvent): void => {
        let clickedElem = e.target as HTMLElement;
        if (clickedElem !== usernameRef && clickedElem !== passwordRef) {
            normalEyeStyle();
            normalHandStyle();
        }
    });
};
