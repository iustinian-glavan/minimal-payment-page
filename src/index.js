import { html, render } from "lit-html";
import { LionFieldset } from "@lion/fieldset";
import { LionInputIban } from "@lion/input-iban";
import { LionInputAmount } from "@lion/input-amount";
import { LionInput } from "@lion/input";
import { LionButton } from "@lion/button";
import { Required, MinMaxLength, MinMaxNumber, Pattern } from "@lion/form-core";
import { IsNotCountryIBAN } from "@lion/input-iban/src/validators";
import { loadDefaultFeedbackMessages } from "@lion/validate-messages";

customElements.define("lion-fieldset", LionFieldset);
customElements.define("lion-input", LionInput);
customElements.define("lion-input-iban", LionInputIban);
customElements.define("lion-button", LionButton);
customElements.define("lion-input-amount", LionInputAmount);

// TODO
// add validateForm
// add disabled/enabled state of transfer button based on field validation

const payment = ({
  form,
  fromName,
  fromIban,
  toName,
  toIban,
  amount,
}) => html`<lion-fieldset
  class="payment-fieldset"
  name=${form.name}
  label=${form.label}
>
  <lion-input
    name=${fromName.name}
    label=${fromName.label}
    class="hasTopMargin"
    .validators=${[
      new Required(),
      new Pattern(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u),
      new MinMaxLength({ min: 3, max: 35 }),
    ]}
    .fieldName="name"
  ></lion-input>

  <lion-input-iban
    name=${fromIban.name}
    label=${fromIban.label}
    .validators=${[new Required(), new IsNotCountryIBAN("IR")]}
    .fieldName="IBAN"
  ></lion-input-iban>

  <lion-input-amount
    name=${amount.name}
    label=${amount.label}
    .validators=${[new Required(), new MinMaxNumber({ min: 5, max: 2000 })]}
    .fieldName="amount"
    class="hasTopMargin"
    currency="EUR"
  ></lion-input-amount>

  <lion-input
    name=${toName.name}
    label=${toName.label}
    class="hasTopMargin"
    .validators=${[
      new Required(),
      new Pattern(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u),
      new MinMaxLength({ min: 3, max: 35 }),
    ]}
    .fieldName="name"
  ></lion-input>

  <lion-input-iban
    name=${toIban.name}
    label=${toIban.label}
    .validators=${[new Required(), new IsNotCountryIBAN(["IR", "RO"])]}
    .fieldName="IBAN"
  >
  </lion-input-iban>

  <lion-button
    class="transferButton hasTopMargin"
    @click=${(ev) => console.log("on transfer", ev.target)}
    >Transfer</lion-button
  >
</lion-fieldset>`;

render(
  payment({
    form: {
      name: "payment",
      label: "Fill out payment information",
    },
    fromName: {
      label: "Sender name",
      name: "from-name",
    },
    fromIban: {
      label: "IBAN",
      name: "from-iban",
    },
    toName: {
      label: "Receiver name",
      name: "to-name",
    },
    toIban: {
      label: "IBAN",
      name: "to-iban",
    },
    amount: {
      name: "amount",
      label: "Amount",
    },
  }),
  document.getElementById("app")
);
loadDefaultFeedbackMessages();
