<template>
    <div class="flex flex-col space-y-4 pt-10">
        <ul class="steps">
            <li class="step step-primary">Billing</li>
            <li class="step step-primary">Card</li>
        </ul>
        <div>
            <div class="frame-another-input"></div>
            <section class="frame-wrapper flex flex-col space-y-4">
                <div class="frame-card-number input input-bordered"></div>
                <div class="frame-expiry-date input input-bordered"></div>
                <div class="frame-cvv input input-bordered"></div>
                <button class="btn-submit btn btn-primary">submit</button>
            </section>

            <iframe class="frame-3ds" title="frame-3ds invisible"></iframe>
        </div>
    </div>
</template>
<script lang="tsx" setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { legend } from '../legend'
const router = useRouter();
const route = useRoute();


onMounted(async () => {
    try {
        const resp = await legend.addPaymentMethod({
            uuidAddress: route.params.uuid, // 使用 setBillingAddress() 方法返回的 uuid
            cardNumber: {},
            expiryDate: {},
            cvv: {},
        });
        console.log("add payment method: \n%o", resp);
        router.push('/trade')
    } catch (err) {
        console.log("error occured: ");
        console.error(err);
    }
})
</script>