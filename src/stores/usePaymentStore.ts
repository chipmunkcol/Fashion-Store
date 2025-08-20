import { create } from "zustand";

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  detailAddress: string;
  zipCode: string;
 }
 
 interface PaymentStore {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  updateCustomerField: (field: keyof CustomerInfo, value: string) => void;
  resetCustomerInfo: () => void;
 }
 
 const initialCustomerInfo: CustomerInfo = {
  name: "",
  phone: "",
  email: "",
  address: "",
  detailAddress: "",
  zipCode: "",
 };
 
 export const usePaymentStore = create<PaymentStore>((set) => ({
  customerInfo: initialCustomerInfo,
  
  setCustomerInfo: (info) => 
    set({ customerInfo: info }),
  
  updateCustomerField: (field, value) =>
    set((state) => ({
      customerInfo: {
        ...state.customerInfo,
        [field]: value,
      },
    })),
  
  resetCustomerInfo: () =>
    set({ customerInfo: initialCustomerInfo }),
 }));