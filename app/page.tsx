"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Download, FileUp, Plus, FileText } from "lucide-react"
import { InvoicePreview } from "@/components/invoice-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageProvider, useLanguage } from "@/components/language-context"

function InvoiceApp() {
  const { language, setLanguage, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [invoiceData, setInvoiceData] = useState({
    from: {
      name: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      email: "",
      phone: "",
    },
    to: {
      name: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      email: "",
      phone: "",
    },
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    items: [
      {
        id: "1",
        description: "",
        quantity: 0,
        rate: 0,
      },
    ],
    notes: "",
    paymentTerms: "",
    bankInfo: {
      name: "",
      accountName: "",
      accountNumber: "",
    },
  })

  const handleFromChange = (field, value) => {
    setInvoiceData({
      ...invoiceData,
      from: {
        ...invoiceData.from,
        [field]: value,
      },
    })
  }

  const handleToChange = (field, value) => {
    setInvoiceData({
      ...invoiceData,
      to: {
        ...invoiceData.to,
        [field]: value,
      },
    })
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-emerald-600 text-white flex items-center justify-center rounded">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 4v16M17 4v16M3 8h18M3 16h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-xl font-medium text-emerald-600">Invoise</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-transparent pr-8 pl-2 py-1 border rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold uppercase">{t("INVOICE")}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t("Generate Invoice")}</p>
              </div>

              <div className="flex overflow-x-auto">
                <Tabs defaultValue="step1" className="w-full" value={`step${currentStep}`}>
                  <TabsList className="w-full justify-start mb-6">
                    <TabsTrigger
                      value="step1"
                      onClick={() => setCurrentStep(1)}
                      className={`${currentStep === 1 ? "bg-gray-900 text-white" : ""} rounded-md px-4 py-2 text-sm`}
                    >
                      1. {t("From & To")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="step2"
                      onClick={() => setCurrentStep(2)}
                      className={`${currentStep === 2 ? "bg-gray-900 text-white" : ""} rounded-md px-4 py-2 text-sm`}
                    >
                      2. {t("Invoice Details")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="step3"
                      onClick={() => setCurrentStep(3)}
                      className={`${currentStep === 3 ? "bg-gray-900 text-white" : ""} rounded-md px-4 py-2 text-sm`}
                    >
                      3. {t("Line Items")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="step4"
                      onClick={() => setCurrentStep(4)}
                      className={`${currentStep === 4 ? "bg-gray-900 text-white" : ""} rounded-md px-4 py-2 text-sm`}
                    >
                      4. {t("Payment Info")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="step5"
                      onClick={() => setCurrentStep(5)}
                      className={`${currentStep === 5 ? "bg-gray-900 text-white" : ""} rounded-md px-4 py-2 text-sm`}
                    >
                      5. {t("Summary")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="step1" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t("Bill From")}:</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-1">{t("Name")}:</label>
                            <Input
                              placeholder={t("Your name")}
                              value={invoiceData.from.name}
                              onChange={(e) => handleFromChange("name", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Address")}:</label>
                            <Input
                              placeholder={t("Your address")}
                              value={invoiceData.from.address}
                              onChange={(e) => handleFromChange("address", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Zip")}:</label>
                            <Input
                              placeholder={t("Your zip code")}
                              value={invoiceData.from.zip}
                              onChange={(e) => handleFromChange("zip", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("City")}:</label>
                            <Input
                              placeholder={t("Your city")}
                              value={invoiceData.from.city}
                              onChange={(e) => handleFromChange("city", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Country")}:</label>
                            <Input
                              placeholder={t("Your country")}
                              value={invoiceData.from.country}
                              onChange={(e) => handleFromChange("country", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Email")}:</label>
                            <Input
                              placeholder={t("Your email")}
                              type="email"
                              value={invoiceData.from.email}
                              onChange={(e) => handleFromChange("email", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Phone")}:</label>
                            <Input
                              placeholder={t("Your phone number")}
                              value={invoiceData.from.phone}
                              onChange={(e) => handleFromChange("phone", e.target.value)}
                            />
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            {t("Add Custom Input")}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t("Bill To")}:</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-1">{t("Name")}:</label>
                            <Input
                              placeholder={t("Receiver name")}
                              value={invoiceData.to.name}
                              onChange={(e) => handleToChange("name", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Address")}:</label>
                            <Input
                              placeholder={t("Receiver address")}
                              value={invoiceData.to.address}
                              onChange={(e) => handleToChange("address", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Zip")}:</label>
                            <Input
                              placeholder={t("Receiver zip code")}
                              value={invoiceData.to.zip}
                              onChange={(e) => handleToChange("zip", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("City")}:</label>
                            <Input
                              placeholder={t("Receiver city")}
                              value={invoiceData.to.city}
                              onChange={(e) => handleToChange("city", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Country")}:</label>
                            <Input
                              placeholder={t("Receiver country")}
                              value={invoiceData.to.country}
                              onChange={(e) => handleToChange("country", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Email")}:</label>
                            <Input
                              placeholder={t("Receiver email")}
                              type="email"
                              value={invoiceData.to.email}
                              onChange={(e) => handleToChange("email", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">{t("Phone")}:</label>
                            <Input
                              placeholder={t("Receiver phone number")}
                              value={invoiceData.to.phone}
                              onChange={(e) => handleToChange("phone", e.target.value)}
                            />
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            {t("Add Custom Input")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="step2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{t("Invoice Details")}</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {t("This section will contain invoice number, dates, and other details.")}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="step3">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{t("Line Items")}</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {t("This section will contain the items, quantities, and prices.")}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="step4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{t("Payment Information")}</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {t("This section will contain payment terms and bank details.")}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="step5">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{t("Summary")}</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {t("This section will show a summary of the invoice and allow you to finalize it.")}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700">
                  {t("Next")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{t("Actions")}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("Operations and preview")}</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FileUp className="h-4 w-4" />
                  {t("Load Invoice")}
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  {t("Export Invoice")}
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  {t("New Invoice")}
                </Button>
                <Button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <FileText className="h-4 w-4" />
                  {t("Generate PDF")}
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{t("Live Preview")}:</h3>
              <InvoicePreview invoiceData={invoiceData} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t py-6 text-center">
        <p className="text-emerald-600 font-medium">Developed by Aditya Akbar</p>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <InvoiceApp />
    </LanguageProvider>
  )
}
