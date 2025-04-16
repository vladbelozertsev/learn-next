"use client";

import Script from "next/script";
import { Fragment, useRef } from "react";

export default function YooKassa() {
  const mapRef = useRef(null);

  // const asd =
  return (
    <Fragment>
      <div id="payment-form"></div>
      <Script
        src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"
        onReady={() => {
          console.log(window.YooMoneyCheckoutWidget);

          //https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/additional-settings/behaviour#payment-events

          const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: "confirmation-token", //Token that must be obtained from YooMoney before the payment process
            return_url: "https://example.com", //URL to the payment completion page
            // https://yookassa.ru/developers/payment-acceptance/integration-scenarios/widget/additional-settings/design#color
            customization: {
              //Color scheme customization, minimum one parameter, color values in HEX
              colors: {
                //Accent color: Pay button, selected radio buttons, checkboxes, and text boxes
                control_primary: "#F00", //Color value in HEX
              },
            },
            error_callback: function (error) {
              console.error(error);
              //Processing of initialization errors
            },
          });

          checkout.on("complete", () => {
            //Code to be run after payment.

            //Deletion of an initialized widget
            checkout.destroy();
          });

          checkout
            .render("payment-form")
            //The method returns Promise. When Promise is executed, it means the payment form is fully loaded (optional use).
            .then(() => {
              //Code that must be executed after the payment form is displayed.
            });
        }}
      />
    </Fragment>
  );
}
