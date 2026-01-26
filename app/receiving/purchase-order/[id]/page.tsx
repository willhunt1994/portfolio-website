'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';
import Link from 'next/link';

interface PurchaseOrder {
  id: string;
  purchaseOrderNumber: string;
  supplier: 'ASC' | 'SSA' | 'SUPA' | 'INT ACT';
  status: 'Order Placed' | 'In Transit' | 'Received';
  expectedDate?: Date;
  receivedDate?: Date;
  totalItems: number;
  totalQuantity: number;
}

// This would typically come from an API or database
// For now, we'll need to pass the purchase order data via URL params or fetch it
// Since we can't easily pass complex objects via URL, we'll need to store the data
// or fetch it based on the ID. For simplicity, let's use localStorage or URL search params

export default function PurchaseOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const purchaseOrderId = params.id as string;
  
  // Get purchase order data from localStorage (set when navigating)
  const [purchaseOrder, setPurchaseOrder] = React.useState<PurchaseOrder | null>(null);
  
  React.useEffect(() => {
    const storedPO = localStorage.getItem(`purchaseOrder_${purchaseOrderId}`);
    if (storedPO) {
      try {
        const poData = JSON.parse(storedPO);
        // Convert date strings back to Date objects
        if (poData.expectedDate) {
          poData.expectedDate = new Date(poData.expectedDate);
        }
        if (poData.receivedDate) {
          poData.receivedDate = new Date(poData.receivedDate);
        }
        setPurchaseOrder(poData);
      } catch (e) {
        console.error('Error parsing purchase order data:', e);
      }
    }
  }, [purchaseOrderId]);
  
  const handleMarkAsReceived = () => {
    if (!purchaseOrder) return;
    
    const updatedPO: PurchaseOrder = {
      ...purchaseOrder,
      status: 'Received',
      receivedDate: new Date()
    };
    
    // Update local state
    setPurchaseOrder(updatedPO);
    
    // Update localStorage
    localStorage.setItem(`purchaseOrder_${purchaseOrderId}`, JSON.stringify(updatedPO));
    
    // Also update in the main purchase orders data if it exists
    // This would typically be done via an API call, but for now we'll update localStorage
    const allPOsKey = 'allPurchaseOrders';
    const allPOs = JSON.parse(localStorage.getItem(allPOsKey) || '{}');
    // Find and update the PO in the stored data structure
    // This is a simplified approach - in production you'd use an API
  };
  
  if (!purchaseOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Purchase order not found</p>
          <Link href="/receiving" className="text-blue-600 hover:text-blue-800 underline">
            Back to Receiving
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{purchaseOrder.purchaseOrderNumber}</h1>
            <div className="flex items-center gap-4">
              {purchaseOrder.status !== 'Received' && (
                <button
                  onClick={handleMarkAsReceived}
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Mark as Received
                </button>
              )}
              <Link
                href="/receiving"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon className="size-6" />
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap border ${
                purchaseOrder.supplier === 'ASC' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                purchaseOrder.supplier === 'SSA' ? 'bg-green-50 text-green-600 border-green-100' :
                purchaseOrder.supplier === 'SUPA' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                'bg-pink-50 text-pink-600 border-pink-100' // INT ACT
              }`}>
                {purchaseOrder.supplier}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap border ${
                purchaseOrder.status === 'Order Placed' ? 'bg-gray-200 text-gray-900 border-gray-400' :
                purchaseOrder.status === 'In Transit' ? 'bg-blue-200 text-blue-900 border-blue-400' :
                'bg-emerald-200 text-emerald-900 border-emerald-400' // Received
              }`}>
                {purchaseOrder.status}
              </span>
              {purchaseOrder.expectedDate && (
                <span className="text-sm text-gray-600">
                  Expected: {purchaseOrder.expectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
              {purchaseOrder.receivedDate && (
                <span className="text-sm text-gray-600">
                  Received: {purchaseOrder.receivedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Shelf Location</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const productNames = ['Custom Socks - Black', 'Custom Socks - White', 'Custom Socks - Navy', 'Custom Socks - Red'];
                  const productSkus = ['SKU-001-BLK', 'SKU-002-WHT', 'SKU-003-NVY', 'SKU-004-RED'];
                  const shelfNumbers = [5, 8, 12, 3, 7, 15, 2, 9, 14, 6];
                  const shelfLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
                  
                  // Distribute products across purchase orders
                  const itemsPerProduct = Math.floor(purchaseOrder.totalItems / productNames.length);
                  const remainder = purchaseOrder.totalItems % productNames.length;
                  const quantityPerItem = Math.floor(purchaseOrder.totalQuantity / purchaseOrder.totalItems);
                  const quantityRemainder = purchaseOrder.totalQuantity % purchaseOrder.totalItems;
                  
                  const poProducts: Array<{ name: string; sku: string; quantity: number; shelfLocation: string }> = [];
                  
                  productNames.forEach((name, idx) => {
                    const itemCount = itemsPerProduct + (idx < remainder ? 1 : 0);
                    if (itemCount > 0) {
                      const baseQuantity = quantityPerItem;
                      const extraQuantity = idx < quantityRemainder ? 1 : 0;
                      const totalQuantity = baseQuantity * itemCount + extraQuantity;
                      
                      if (totalQuantity > 0) {
                        const shelfNum = shelfNumbers[idx % shelfNumbers.length];
                        const shelfLetter = shelfLetters[idx % shelfLetters.length];
                        poProducts.push({
                          name,
                          sku: productSkus[idx],
                          quantity: totalQuantity,
                          shelfLocation: `${shelfNum}${shelfLetter}`
                        });
                      }
                    }
                  });
                  
                  return poProducts.map((product, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-900">{product.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
                          {product.shelfLocation}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-600">{product.sku}</td>
                      <td className="p-3 text-sm text-gray-600 text-right">{product.quantity}</td>
                    </tr>
                  ));
                })()}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan={3} className="p-3 text-sm text-gray-900"></td>
                  <td className="p-3 text-sm text-gray-900 text-right">{purchaseOrder.totalQuantity}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
