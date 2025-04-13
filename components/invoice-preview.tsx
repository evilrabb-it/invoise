"use client"

import { useLanguage } from "@/components/language-context"

export function InvoicePreview({ invoiceData }) {
  const { language, t } = useLanguage()

  // Calculate subtotal and total
  const calculateTotals = () => {
    let subtotal = 0

    invoiceData.items.forEach((item) => {
      subtotal += item.quantity * item.rate
    })

    return {
      subtotal: subtotal.toFixed(2),
      total: subtotal.toFixed(2),
    }
  }

  const { subtotal, total } = calculateTotals()

  // Format number based on currency
  const formatCurrency = (number) => {
    if (language === "id") {
      return new Intl.NumberFormat("id-ID").format(number)
    } else {
      return new Intl.NumberFormat("en-US").format(number)
    }
  }

  const currencySymbol = t("currency")

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
        <p>{invoiceData.to.name || ""}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">{t("Invoice date")}:</p>
          <p>{t("Invalid Date")}</p>
        </div>
        <div>
          <p className="text-gray-600">{t("Due date")}:</p>
          <p>{t("Invalid Date")}</p>
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
          <tr>
            <td className="py-2"></td>
            <td className="text-center py-2">0</td>
            <td className="text-center py-2">{currencySymbol} 0</td>
            <td className="text-right py-2">{currencySymbol} 0</td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-col items-end space-y-1 mb-6">
        <div className="flex justify-between w-1/2">
          <span>{t("Subtotal")}:</span>
          <span>{currencySymbol} 0</span>
        </div>
        <div className="flex justify-between w-1/2 font-semibold">
          <span>{t("Total")}:</span>
          <span>{currencySymbol} 0</span>
        </div>
        <div className="flex justify-between w-1/2 text-gray-600 text-xs">
          <span>{t("Total in words")}:</span>
          <span>
            {t("Zero")} {language === "id" ? "Rupiah" : "Dollars"}
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
          <p className="text-gray-600">{invoiceData.paymentTerms || ""}</p>
        </div>
        <div>
          <h4 className="font-semibold">{t("Please send the payment to this address")}</h4>
          <p className="text-gray-600">{t("Bank")}:</p>
          <p className="text-gray-600">{t("Account name")}:</p>
          <p className="text-gray-600">{t("Account no")}:</p>
        </div>
        <p className="text-gray-600 text-xs mt-4">
          {t("If you have any questions concerning this invoice, use the following contact information:")}
        </p>
      </div>
    </div>
  )
}
