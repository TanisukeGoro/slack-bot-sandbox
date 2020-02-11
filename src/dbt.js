const { postMessage } = require('./utils');

const URL = 'https://app.burgerking.co.jp/bkjh-omni';

const handleFetchCoupon = auth_token => {
    const body = {
        'header': {
            'trcode': 'BKJ4001',
            'auth_token': auth_token
        },
        'body': {
            'CD_COUPON_OBJ': '03'
        }
    };
    return axios.post(`${URL}/BKJ4001.json`, `message=${JSON.stringify(body)}`)
        .then(res => res.data);
};


const generateMessage = coupons => {
    const message = coupons.reduce((accum, coupon) => {
        return `
            ${accum}
            ------------------------------------------------------------
            商品名: ${coupon.NM_CUP_MENU}
            価格: ${coupon.REAL_CUP_PRICE}円 → ${coupon.SALE_CUP_PRICE}円
            クーポン番号: ${coupon.CD_COUPON}
        `;
    })
    return `\`\`\`
今日のバーキンクーポン情報
${message}
\`\`\``;
};

const handleDbt = channel_id => {
    handleFetchCoupon(process.env.BURGER_KING_AUTH_TOKEN)
        .then(data => {
            const message = generateMessage(data.body.couponList);
            postMessage(channel_id, message)
        });
};

module.exports = handleDbt;