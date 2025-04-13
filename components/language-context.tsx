"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define translations
const translations = {
  en: {
    INVOICE: "INVOICE",
    "Generate Invoice": "Generate Invoice",
    "From & To": "From & To",
    "Invoice Details": "Invoice Details",
    "Line Items": "Line Items",
    "Payment Info": "Payment Info",
    Summary: "Summary",
    "Bill From": "Bill From",
    "Bill To": "Bill To",
    Name: "Name",
    Address: "Address",
    Zip: "Zip",
    City: "City",
    Country: "Country",
    Email: "Email",
    Phone: "Phone",
    "Your name": "Your name",
    "Your address": "Your address",
    "Your zip code": "Your zip code",
    "Your city": "Your city",
    "Your country": "Your country",
    "Your email": "Your email",
    "Your phone number": "Your phone number",
    "Receiver name": "Receiver name",
    "Receiver address": "Receiver address",
    "Receiver zip code": "Receiver zip code",
    "Receiver city": "Receiver city",
    "Receiver country": "Receiver country",
    "Receiver email": "Receiver email",
    "Receiver phone number": "Receiver phone number",
    "Add Custom Input": "Add Custom Input",
    "This section will contain invoice number, dates, and other details.":
      "This section will contain invoice number, dates, and other details.",
    "This section will contain the items, quantities, and prices.":
      "This section will contain the items, quantities, and prices.",
    "Payment Information": "Payment Information",
    "This section will contain payment terms and bank details.":
      "This section will contain payment terms and bank details.",
    "This section will show a summary of the invoice and allow you to finalize it.":
      "This section will show a summary of the invoice and allow you to finalize it.",
    Next: "Next",
    Actions: "Actions",
    "Operations and preview": "Operations and preview",
    "Load Invoice": "Load Invoice",
    "Export Invoice": "Export Invoice",
    "New Invoice": "New Invoice",
    "Generate PDF": "Generate PDF",
    "Live Preview": "Live Preview",
    "Invoice #": "Invoice #",
    "Bill to": "Bill to",
    "Invoice date": "Invoice date",
    "Due date": "Due date",
    "Invalid Date": "Invalid Date",
    ITEM: "ITEM",
    QTY: "QTY",
    RATE: "RATE",
    AMOUNT: "AMOUNT",
    Subtotal: "Subtotal",
    Total: "Total",
    "Total in words": "Total in words",
    Zero: "Zero",
    amount_zero: "Zero",
    "Additional notes": "Additional notes",
    "Payment terms": "Payment terms",
    "Please send the payment to this address": "Please send the payment to this address",
    Bank: "Bank",
    "Account name": "Account name",
    "Account no": "Account no",
    "If you have any questions concerning this invoice, use the following contact information:":
      "If you have any questions concerning this invoice, use the following contact information:",
    currency: "USD",
  },
  id: {
    INVOICE: "FAKTUR",
    "Generate Invoice": "Buat Faktur",
    "From & To": "Pengirim & Penerima",
    "Invoice Details": "Detail Faktur",
    "Line Items": "Daftar Barang",
    "Payment Info": "Info Pembayaran",
    Summary: "Ringkasan",
    "Bill From": "Tagihan Dari",
    "Bill To": "Tagihan Untuk",
    Name: "Nama",
    Address: "Alamat",
    Zip: "Kode Pos",
    City: "Kota",
    Country: "Negara",
    Email: "Email",
    Phone: "Telepon",
    "Your name": "Nama Anda",
    "Your address": "Alamat Anda",
    "Your zip code": "Kode Pos Anda",
    "Your city": "Kota Anda",
    "Your country": "Negara Anda",
    "Your email": "Email Anda",
    "Your phone number": "Nomor Telepon Anda",
    "Receiver name": "Nama Penerima",
    "Receiver address": "Alamat Penerima",
    "Receiver zip code": "Kode Pos Penerima",
    "Receiver city": "Kota Penerima",
    "Receiver country": "Negara Penerima",
    "Receiver email": "Email Penerima",
    "Receiver phone number": "Nomor Telepon Penerima",
    "Add Custom Input": "Tambah Kolom Kustom",
    "This section will contain invoice number, dates, and other details.":
      "Bagian ini akan berisi nomor faktur, tanggal, dan detail lainnya.",
    "This section will contain the items, quantities, and prices.": "Bagian ini akan berisi barang, jumlah, dan harga.",
    "Payment Information": "Informasi Pembayaran",
    "This section will contain payment terms and bank details.":
      "Bagian ini akan berisi syarat pembayaran dan detail bank.",
    "This section will show a summary of the invoice and allow you to finalize it.":
      "Bagian ini akan menampilkan ringkasan faktur dan memungkinkan Anda untuk menyelesaikannya.",
    Next: "Selanjutnya",
    Actions: "Tindakan",
    "Operations and preview": "Operasi dan pratinjau",
    "Load Invoice": "Muat Faktur",
    "Export Invoice": "Ekspor Faktur",
    "New Invoice": "Faktur Baru",
    "Generate PDF": "Buat PDF",
    "Live Preview": "Pratinjau Langsung",
    "Invoice #": "Faktur #",
    "Bill to": "Tagihan untuk",
    "Invoice date": "Tanggal faktur",
    "Due date": "Tanggal jatuh tempo",
    "Invalid Date": "Tanggal tidak valid",
    ITEM: "BARANG",
    QTY: "JML",
    RATE: "HARGA",
    AMOUNT: "JUMLAH",
    Subtotal: "Subtotal",
    Total: "Total",
    "Total in words": "Total dalam kata",
    Zero: "Nol",
    amount_zero:"Nol",
    "Additional notes": "Catatan tambahan",
    "Payment terms": "Syarat pembayaran",
    "Please send the payment to this address": "Silakan kirim pembayaran ke alamat ini",
    Bank: "Bank",
    "Account name": "Nama rekening",
    "Account no": "Nomor rekening",
    "If you have any questions concerning this invoice, use the following contact information:":
      "Jika Anda memiliki pertanyaan mengenai faktur ini, gunakan informasi kontak berikut:",
    currency: "Rp",
  },
}

// Create context with default values to avoid null checks
const defaultContextValue = {
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
}

// Create context
const LanguageContext = createContext(defaultContextValue)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = (key) => {
    if (!mounted) return key
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
