const AI_ANSWERS = {
  muzakere:
    "Supplier B geçmişte benzer kategorilerde ortalama %8 indirim yapmış. Mevcut teklifi piyasa ortalamasının %4 altında. Müzakere öneririm: teslimat süresini 5 güne çekmeleri karşılığında %5 ek indirim talep edin.",
  enIyi:
    "Bu RFQ için en iyi teklif Supplier B'den geliyor: toplam €71.200, 7 gün teslimat. Supplier A'ya göre %4.9 daha düşük; teslimat süresi de daha kısa.",
  piyasa:
    "BT donanım kategorisinde son 6 ayda benzer lot büyüklüklerinde ortalama birim fiyat €745–€780 aralığında. Supplier B'nin teklifi bu aralığın altında.",
  default:
    "Bu RFQ için 3 teklif alındı. En düşük toplam Supplier B (€71.200). Kalemler ve teslimat koşullarını karşılaştırma tablosundan inceleyebilirsiniz.",
};

function pickAnswer(question) {
  const q = question.toLowerCase();
  if (q.includes("müzakere") || q.includes("muzakere")) return AI_ANSWERS.muzakere;
  if (q.includes("en iyi") || q.includes("kim veriyor")) return AI_ANSWERS.enIyi;
  if (q.includes("piyasa") || q.includes("fiyat")) return AI_ANSWERS.piyasa;
  return AI_ANSWERS.default;
}

export const SUGGESTED_QUESTIONS = [
  "Supplier B ile müzakere edebilir miyim?",
  "En iyi teklifi kim veriyor?",
  "Bu kategoride piyasa fiyatı ne?",
];

/**
 * Mock AI streaming — karakter karakter yanıt üretir.
 * @param {string} question
 * @param {(chunk: string) => void} onChunk
 * @param {() => void} onDone
 * @returns {() => void} cancel fonksiyonu
 */
export function mockAiStream(question, onChunk, onDone) {
  const text = pickAnswer(question);
  let index = 0;

  const intervalId = setInterval(() => {
    if (index < text.length) {
      onChunk(text[index]);
      index += 1;
    } else {
      clearInterval(intervalId);
      onDone?.();
    }
  }, 30);

  return () => clearInterval(intervalId);
}
