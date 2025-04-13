"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { InvoicePreview } from "@/components/invoice-preview";
import { LanguageProvider, useLanguage } from "@/components/language-context";

// Prevent static generation
export function generateStaticParams() {
  return [];
}

function NewInvoicePage() {
  const { language, setLanguage } = useLanguage();

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-" + Math.floor(1000 + Math.random() * 9000),
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    sender: {
      name: "Your Company",
      address: "123 Business St",
      city: "San Francisco, CA 94103",
      email: "billing@yourcompany.com",
      phone: "(555) 123-4567",
    },
    client: {
      name: "",
      address: "",
      city: "",
      email: "",
      phone: "",
    },
    items: [
      {
        id: "1",
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
      },
    ],
    notes: "",
  });

  const addLineItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        {
          id: Date.now().toString(),
          description: "",
          quantity: 1,
          unitPrice: 0,
          taxRate: 0,
        },
      ],
    });
  };

  const removeLineItem = (id) => {
    if (invoiceData.items.length === 1) return;
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((item) => item.id !== id),
    });
  };

  const updateLineItem = (id, field, value) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    });
  };

  const updateSenderInfo = (field, value) => {
    setInvoiceData({
      ...invoiceData,
      sender: {
        ...invoiceData.sender,
        [field]: value,
      },
    });
  };

  const updateClientInfo = (field, value) => {
    setInvoiceData({
      ...invoiceData,
      client: {
        ...invoiceData.client,
        [field]: value,
      },
    });
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", invoiceData);
    // Add logic to save the draft (e.g., to localStorage or an API)
  };

  const handleCreateInvoice = () => {
    console.log("Creating invoice:", invoiceData);
    // Add logic to create the invoice (e.g., send to an API)
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Create New Invoice</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setLanguage("en")}
            disabled={language === "en"}
          >
            English
          </Button>
          <Button
            variant="outline"
            onClick={() => setLanguage("id")}
            disabled={language === "id"}
          >
            Bahasa Indonesia
          </Button>
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handleCreateInvoice}>Create Invoice</Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:flex-row md:gap-8 md:p-8">
        <div className="flex flex-1 flex-col gap-4 md:max-w-[600px]">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invoice-number">Invoice Number</Label>
                    <Input
                      id="invoice-number"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issue-date">Issue Date</Label>
                    <Input
                      id="issue-date"
                      type="date"
                      value={invoiceData.issueDate}
                      onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">Your Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sender-name">Company Name</Label>
                  <Input
                    id="sender-name"
                    value={invoiceData.sender.name}
                    onChange={(e) => updateSenderInfo("name", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sender-address">Address</Label>
                  <Input
                    id="sender-address"
                    value={invoiceData.sender.address}
                    onChange={(e) => updateSenderInfo("address", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sender-city">City, State, ZIP</Label>
                  <Input
                    id="sender-city"
                    value={invoiceData.sender.city}
                    onChange={(e) => updateSenderInfo("city", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sender-email">Email</Label>
                    <Input
                      id="sender-email"
                      type="email"
                      value={invoiceData.sender.email}
                      onChange={(e) => updateSenderInfo("email", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sender-phone">Phone</Label>
                    <Input
                      id="sender-phone"
                      value={invoiceData.sender.phone}
                      onChange={(e) => updateSenderInfo("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">Client Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input
                    id="client-name"
                    value={invoiceData.client.name}
                    onChange={(e) => updateClientInfo("name", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-address">Address</Label>
                  <Input
                    id="client-address"
                    value={invoiceData.client.address}
                    onChange={(e) => updateClientInfo("address", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-city">City, State, ZIP</Label>
                  <Input
                    id="client-city"
                    value={invoiceData.client.city}
                    onChange={(e) => updateClientInfo("city", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input
                      id="client-email"
                      type="email"
                      value={invoiceData.client.email}
                      onChange={(e) => updateClientInfo("email", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client-phone">Phone</Label>
                    <Input
                      id="client-phone"
                      value={invoiceData.client.phone}
                      onChange={(e) => updateClientInfo("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Line Items</h3>
                <Button variant="outline" size="sm" onClick={addLineItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="grid gap-4">
                    {index > 0 && <Separator />}
                    <div className="grid gap-2">
                      <Label htmlFor={`item-description-${item.id}`}>Description</Label>
                      <Input
                        id={`item-description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                        <Input
                          id={`item-quantity-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`item-price-${item.id}`}>Unit Price</Label>
                        <Input
                          id={`item-price-${item.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`item-tax-${item.id}`}>Tax Rate (%)</Label>
                        <Input
                          id={`item-tax-${item.id}`}
                          type="number"
                          min="0"
                          max="100" // Fixed syntax error
                          value={item.taxRate}
                          onChange={(e) => updateLineItem(item.id, "taxRate", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Line Total: ${(item.quantity * item.unitPrice * (1 + item.taxRate / 100)).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(item.id)}
                        disabled={invoiceData.items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes or payment terms..."
                  className="min-h-[100px]"
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sticky top-24 hidden md:block md:w-[500px] lg:w-[600px]">
          <LanguageProvider>
            <InvoicePreview invoiceData={invoiceData} />
          </LanguageProvider>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t py-6 text-center">
        <p className="text-emerald-600 font-medium">Developed by Aditya Akbar</p>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <NewInvoicePage />
    </LanguageProvider>
  );
                                                        }
