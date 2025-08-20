<template>
    <section>
        <div class=" flex flex-col items-start justify-start space-y-4">


            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-left">I want to pay</legend>
                <label class="input w-full flex justify-between">
                    <input type="text" class="grow" placeholder="Type here, min 50" v-model.number="amount" />
                    <span class="badge badge-neutral badge-xs">USD</span>
                </label>
            </fieldset>

            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-left">I will receive ≈</legend>
                <label class="input w-full flex justify-between">
                    {{ quote?.quantity ?? '--' }}
                    <span class="badge badge-neutral badge-xs">USDT</span>
                </label>
            </fieldset>

            <fieldset class="fieldset w-full">
                <legend class="fieldset-legend text-left">Select a Card</legend>
                <select class="select w-full" v-model="payment_method_id">
                    <option disabled selected value="">+Select</option>
                    <option v-for="(item, i) in payments" :key="item.payment_method_id"
                        v-bind:value="item.payment_method_id">【{{ item.type }}】 {{ item.title }} ｜ {{ item.account_number }}</option>
                </select>
                <span class="label cursor-pointer" @click="$router.push('/billing')">+Bind a Card</span>
            </fieldset>
            <label class="input w-full" v-if="payment_method_id">
                CVV
                <input type="text" class="grow" placeholder="Type here, for example: 100" v-model="cvv" />
            </label>

            <p class=" text-sm">Estimated price:1 USDT ≈ {{ quote?.price ?? '--' }} USD</p>

            <div class=" flex items-center justify-center w-full">
                <button class=" btn btn-primary btn-wide" @click="onSubmit" :disabled="!amount || !payment_method_id || !cvv"><span class="loading loading-spinner"
                        v-if="loading"></span>Submit</button>
            </div>
        </div>

        <dialog ref="dialog" class="modal">
            <div class="modal-box">
                <iframe class="frame-3ds" title="frame-3ds"></iframe>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </section>
</template>
<script lang="tsx" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { legend } from '../legend'
const payments = ref<LegendBaseTypes.PaymentMethod[]>([])
const quote = ref<LegendBaseTypes.QuoteByFiatResponse>()
const amount = ref()
const payment_method_id = ref("")
const cvv = ref("")
const loading = ref(false);
const dialog = ref()

const onSubmit = async () => {
    loading.value = true;
    const transaction_id = await Promise.resolve(Date.now().toString());
    const resp = await legend.orderByFiat({
        frame3DsSelector: ".frame-3ds", // 用来装载 3DS 验证网页的元素选择器，需要是一个容器元素，或者 iframe 元素
        showFrame3Ds: () => { dialog.value.showModal() }, // 显示 3DS 验证网页时执行的函数
        hideFrame3Ds: () => { dialog.value.close() }, // 隐藏 3DS 验证网页时执行的函数
        app_state: transaction_id, // 任意字符串，用于关联交易订单，会在相关的 webhook 中通过 reference 字段传递
        network: "ETH", // 数字货币使用的区块链网络
        pair: "USDTUSD", // 交易对，最后三位字符串表示法币，之前的表示数字货币。
        payment_method_id: payment_method_id.value, // 支付方式的 id
        side: "buy", // 交易方向
        size: amount.value, // 交易数量
        cvv: cvv.value // 使用的信用卡的 CVV 安全码，需要在交易执行之前通过 UI 读取用户输入的安全码
    });
    if (resp) {
        // router.push({ name: 'result', params: { result:JSON.stringify(resp)} });
        alert("success");
    }
    console.log("🚀 ~ onSubmit ~ resp:", resp)
    loading.value = false;
}

watchEffect(async () => {
    if (amount.value && payment_method_id.value) {
        quote.value = await legend.quoteByFiat({
            pair: "USDTUSD",
            payment_method_id: payment_method_id.value,
            side: "buy",
            size: amount.value ?? 40,
        });
    }
})

onMounted(async () => {
    payments.value = (await legend.getAllPaymentMethods()).filter(item=>item.is_expired==false);
})
</script>