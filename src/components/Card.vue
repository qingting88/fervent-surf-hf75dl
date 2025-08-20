<template>
    <div class="flex flex-col space-y-4 pt-10">
        <ul class="steps">
            <li class="step step-primary">Billing</li>
            <li class="step step-primary">Card</li>
        </ul>
        <div>
            <div class="frame-another-input"></div>
            <section class="frame-wrapper flex flex-col space-y-4">
                <div class="frame-card-number input w-full" ></div>
                <div class="frame-expiry-date input w-full"></div>
                <div class="frame-cvv input w-full"></div>
                <button class="btn-submit btn btn-primary">submit</button>
            </section>

            <div class="mockup-code w-full mt-10">
                <code>card number</code>
                <code>参考：https://www.checkout.com/docs/developer-resources/testing/test-cards</code>
            </div>

            <dialog ref="dialog" class="modal">
                <div class="modal-box flex items-center justify-center">
                    <iframe class="frame-3ds" title="frame-3ds"></iframe>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    </div>
</template>
<script lang="tsx" setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { legend } from '../legend'
const router = useRouter();
const route = useRoute();
const dialog = ref()

onMounted(async () => {
    const handleFrameEvents = (type: any) => (...args: any) => {
        console.log(type, ...args);
        if (type === "FRAME_VALIDATION_CHANGED") {
            const $frame: any = document.querySelector(`.frame-${args[0].element}`);
            if (args[0].isValid || args[0].isEmpty) {
                $frame.classList.remove("error");
            } else {
                $frame.classList.add("error");
            }
        }
    };
    try {

        const resp = await legend.addPaymentMethod({
            uuidAddress: route.params.uuid, // 使用 setBillingAddress() 方法返回的 uuid
            btnSubmitSelector: ".btn-submit",
            frame3DsSelector: ".frame-3ds",
            showFrame3Ds: () => { dialog.value.showModal() },
            hideFrame3Ds: () => { dialog.value.close() },
            cardNumber: {},
            expiryDate: {},
            cvv: {},
            events: {
                CARD_BIN_CHANGED: handleFrameEvents("CARD_BIN_CHANGED"),
                CARD_SUBMITTED: handleFrameEvents("CARD_SUBMITTED"),
                CARD_TOKENIZED: handleFrameEvents("CARD_TOKENIZED"),
                CARD_TOKENIZATION_FAILED: handleFrameEvents("CARD_TOKENIZATION_FAILED"),
                CARD_VALIDATION_CHANGED: handleFrameEvents("CARD_VALIDATION_CHANGED"),
                FRAME_ACTIVATED: handleFrameEvents("FRAME_ACTIVATED"),
                FRAME_FOCUS: handleFrameEvents("FRAME_FOCUS"),
                FRAME_BLUR: handleFrameEvents("FRAME_BLUR"),
                FRAME_VALIDATION_CHANGED: handleFrameEvents("FRAME_VALIDATION_CHANGED"),
                PAYMENT_METHOD_CHANGED: handleFrameEvents("PAYMENT_METHOD_CHANGED"),
                READY: handleFrameEvents("READY"),
            }
        });
        console.log("add payment method: \n%o", resp);
        if (resp.status === "success") {
            alert("payment method added successfully");
            router.push('/trade')
        }
    } catch (err) {
        console.log("error occured: ");
        console.error(err);
    }
})
</script>