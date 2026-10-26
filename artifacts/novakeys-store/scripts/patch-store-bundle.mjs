import { readFile, writeFile } from 'node:fs/promises';

const bundlePath = new URL(
  '../public/site/assets/index-Bb2i65uo.js',
  import.meta.url,
);

function replaceExact(source, before, after, expectedCount = 1) {
  const count = source.split(before).length - 1;

  if (count === 0 && source.includes(after)) {
    return source;
  }

  if (count !== expectedCount) {
    throw new Error(
      `Expected ${expectedCount} occurrence(s) of ${JSON.stringify(before)}, found ${count}.`,
    );
  }

  return source.split(before).join(after);
}

let bundle = await readFile(bundlePath, 'utf8');

const logoStart = bundle.indexOf('function Xm(');
const logoEnd = bundle.indexOf('function Zm(', logoStart);
const logoReplacement =
  'function Xm({size:e=36}){return(0,I.jsx)(`img`,{src:`/favicon.png`,width:Math.round(e*1.6),height:e,alt:``,className:`shrink-0`,"aria-hidden":`true`,decoding:`async`,style:{objectFit:`contain`}})}';

if (logoStart < 0 || logoEnd < 0) {
  if (!bundle.includes(logoReplacement)) {
    throw new Error('Could not locate the shared brand mark component.');
  }
} else if (bundle.slice(logoStart, logoEnd) !== logoReplacement) {
  bundle =
    bundle.slice(0, logoStart) +
    logoReplacement +
    bundle.slice(logoEnd);
}

bundle = replaceExact(bundle, 'flexyFeePercent:15', 'flexyFeePercent:20');
bundle = replaceExact(
  bundle,
  't(`co.fee`,{n:15})',
  't(`co.fee`,{n:$.flexyFeePercent})',
);
bundle = replaceExact(
  bundle,
  '15%',
  '20%',
  6,
);

const nextStepCopy = [
  [
    'تم تسجيل طلبك',
    'شكرًا لطلبك، تم تسجيله',
  ],
  [
    'أرسل ملخص الطلب ووصل الدفع عبر واتساب أو إنستغرام. بعد التحقق من الدفع نسلّم لك اشتراكك.',
    'أرفق وصل الدفع في محادثة واتساب، واترك رقم الطلب أعلاه ظاهرًا في الرسالة. بعد التحقق من الدفع نسلّم لك اشتراكك.',
  ],
  [
    'أرسل الطلب والوصل على واتساب',
    'أرسل الطلب ووصل الدفع على واتساب',
  ],
  [
    'Your order is recorded',
    'Thank you — your order is recorded',
  ],
  [
    'Send the order summary and payment receipt on WhatsApp or Instagram. Once payment is verified we deliver your subscription.',
    'Please attach your payment receipt in this WhatsApp chat. The order number above helps us verify payment and deliver your subscription.',
  ],
  [
    'Send order and receipt on WhatsApp',
    'Send order and payment proof on WhatsApp',
  ],
  [
    'Votre commande est enregistrée',
    'Merci, votre commande est enregistrée',
  ],
  [
    'Envoyez le récapitulatif et le reçu de paiement sur WhatsApp ou Instagram. Après vérification du paiement, nous livrons votre abonnement.',
    'Veuillez joindre le reçu de paiement dans cette conversation WhatsApp. Le numéro de commande ci-dessus nous aidera à vérifier le paiement et à livrer votre abonnement.',
  ],
  [
    'Envoyer la commande et le reçu sur WhatsApp',
    'Envoyer la commande et la preuve de paiement sur WhatsApp',
  ],
];

for (const [before, after] of nextStepCopy) {
  bundle = replaceExact(bundle, `\`${before}\``, `\`${after}\``);
}

bundle = replaceExact(
  bundle,
  'i.push(``,t(`pay.notice`))',
  'i.push(``,t(`pay.notice`),``,t(`os.next.d`))',
);

await writeFile(bundlePath, bundle);
