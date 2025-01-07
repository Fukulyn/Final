/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export async function asyncGet(api: string): Promise<any> {
    try {
        const res: Response = await fetch(api);
        
        // 檢查響應狀態是否為 200
        if (!res.ok) {
            throw new Error(`API 請求失敗，狀態碼：${res.status}`);
        }

        // Debug: 印出 API 回應資料
        const data = await res.json();
        console.log('API 回應資料:', data);

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("請求錯誤:", error.message);
            return { error: true, message: error.message };
        } else {
            console.error("未知錯誤:", error);
            return { error: true, message: "未知錯誤" };
        }
    }
}

/**
 * 異步執行 Post 請求
 * @param api 要呼叫的api url
 * @param body 
 * @returns json 結果
 */
export async function asyncPost(api: string, body: {} | FormData): Promise<any> {
    try {
        const res: Response = await fetch(api, {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Access-Control-Allow-Origin': "http://localhost:5173/",
                'Content-Type': "application/json"
            }),
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: "cors"
        });

        // 檢查響應狀態是否為 200
        if (!res.ok) {
            throw new Error(`API 請求失敗，狀態碼：${res.status}`);
        }

        // Debug: 印出 API 回應資料
        const data = await res.json();
        console.log('API 回應資料:', data);

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("請求錯誤:", error.message);
            return { error: true, message: error.message };
        } else {
            console.error("未知錯誤:", error);
            return { error: true, message: "未知錯誤" };
        }
    }
}

/**
 * 異步執行 PATCH 請求
 * @param api 要呼叫的api url
 * @param body
 * @returns json 結果
 */
export async function asyncPatch(api: string, body: {} | FormData): Promise<any> {
    try {
        const res: Response = await fetch(api, {
            method: 'PATCH',
            headers: new Headers({
                'Access-Control-Allow-Origin': "http://localhost:5173/",
            }),
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: "cors"
        });

        // 檢查響應狀態是否為 200
        if (!res.ok) {
            throw new Error(`API 請求失敗，狀態碼：${res.status}`);
        }

        // Debug: 印出 API 回應資料
        const data = await res.json();
        console.log('API 回應資料:', data);

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("請求錯誤:", error.message);
            return { error: true, message: error.message };
        } else {
            console.error("未知錯誤:", error);
            return { error: true, message: "未知錯誤" };
        }
    }
}

/**
 * 異步執行 DELETE 請求
 * @param api 要呼叫的api url
 * @returns json 結果
 */
export async function asyncDelete(api: string): Promise<any> {
    try {
        const res: Response = await fetch(api, {
            method: 'DELETE',
            headers: new Headers({
                'Access-Control-Allow-Origin': "http://localhost:5173/",
            }),
            mode: "cors",
        });

        // 檢查響應狀態是否為 200
        if (!res.ok) {
            throw new Error(`API 請求失敗，狀態碼：${res.status}`);
        }

        // Debug: 印出 API 回應資料
        const data = await res.json();
        console.log('API 回應資料:', data);

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("請求錯誤:", error.message);
            return { error: true, message: error.message };
        } else {
            console.error("未知錯誤:", error);
            return { error: true, message: "未知錯誤" };
        }
    }
}

/**
 * 異步執行 PUT 請求
 * @param api 要呼叫的API URL
 * @param body 請求的資料
 * @returns json 結果
 */
export async function asyncPut(api: string, body: {} | FormData): Promise<any> {
    try {
        const res: Response = await fetch(api, {
            method: 'PUT',
            headers: new Headers({
                'Access-Control-Allow-Origin': "http://localhost:5173/",
                'Content-Type': "application/json",
            }),
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: "cors",
        });

        // 檢查響應狀態是否為 200
        if (!res.ok) {
            throw new Error(`API 請求失敗，狀態碼：${res.status}`);
        }

        // Debug: 印出 API 回應資料
        const data = await res.json();
        console.log('API 回應資料:', data);

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("請求錯誤:", error.message);
            return { error: true, message: error.message };
        } else {
            console.error("未知錯誤:", error);
            return { error: true, message: "未知錯誤" };
        }
    }
}
