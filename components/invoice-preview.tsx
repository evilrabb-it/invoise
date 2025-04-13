"use client";

import { useLanguage } from "@/components/language-context";
import numberToWords from "number-to-words";

export function InvoicePreview({ invoiceData }) {
  const { language, t } = useLanguage();

  // Calculate subtotal and total
  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;

    invoiceData.items.forEach((item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      const taxRate = Number(item.taxRate) || 0;

      const lineTotal = quantity * unitPrice;
      subtotal += lineTotal;
      taxTotal += lineTotal * (taxRate / 100);
    });

    return {
      subtotal: subtotal.toFixed(2),
      total: (subtotal + taxTotal).toFixed(2),
    };
  };

  const { subtotal, total } = calculateTotals();

  // Format number based on currency
  const formatCurrency = (number) => {
    const num = Number(number) || 0; // Default to 0 if NaN
    if (language === "id") {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);
    } else {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return t("Invalid Date");
    try {
      return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US").format(new Date(date));
    } catch {
      return t("Invalid Date");
    }
  };

  const totalInWords = total === '0.00' ? t('amount_zero') : `${numberToWords.toWords(Math.floor(total))} ${t('currency')}`;

  return (
    <div className="border rounded-lg p-4 bg-white text-black text-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-bold">{t("Invoice #")}</h2>
          <p className="text-gray-600">{invoiceData.invoiceNumber || ""}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-1">{t("Bill to")}:</h3>
        <p>{invoiceData.client?.name || ""}</p>
        <p>{invoiceData.client?.address || ""}</p>
        <p>{invoiceData.client?.city || ""}</p>
        <p>{invoiceData.client?.email || ""}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">{t("Invoice date")}:</p>
          <p>{formatDate(invoiceData.issueDate)}</p>
        </div>
        <div>
          <p className="text-gray-600">{t("Due date")}:</p>
          <p>{formatDate(invoiceData.dueDate)}</p>
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">{t("ITEM")}</th>
            <th className="text-center py-2">{t("QTY")}</th>
            <th className="text-center py-2">{t("RATE")}</th>
            <th className="text-right py-2">{t("AMOUNT")}</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item) => (
            <tr key={item.id}>
              <td className="py-2">{item.description || ""}</td>
              <td className="text-center py-2">{item.quantity || 0}</td>
              <td className="text-center py-2">{formatCurrency(item.unitPrice)}</td>
              <td className="text-right py-2">{formatCurrency((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-end space-y-1 mb-6">
        <div className="flex justify-between w-1/2">
          <span>{t("Subtotal")}:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between w-1/2 font-semibold">
          <span>{t("Total")}:</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between w-1/2 text-gray-600 text-xs">
          <span>{t("Total in words")}:</span>
          <span>
            {totalInWords} {language === "id" ? "Rupiah" : "Dollars"}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <h4 className="font-semibold">{t("Additional notes")}:</h4>
          <p className="text-gray-600">{invoiceData.notes || ""}</p>
        </div>
        <div>
          <h4 className="font-semibold">{t("Payment terms")}:</h4>
          <p className="text-gray-600">{invoiceData.notes || ""}</p>
        </div>
        <div>
          <h4 className="font-semibold">{t("Please send the payment to this address")}</h4>
          <p className="text-gray-600">{t("Bank")}: {invoiceData.sender?.bank || ""}</p>
          <p className="text-gray-600">{t("Account name")}: {invoiceData.sender?.accountName || ""}</p>
          <p className="text-gray-600">{t("Account no")}: {invoiceData.sender?.accountNumber || ""}</p>
        </div>
        <p className="text-gray-600 text-xs mt-4">
          {t("If you have any questions concerning this invoice, use the following contact information:")}
        </p>
        <p className="text-gray-600 text-xs">{invoiceData.sender?.name || ""}</p>
        <p className="text-gray-600 text-xs">{invoiceData.sender?.email || ""}</p>
      </div>
    </div>
  );
}
