"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import  {setAuthFromStorage}  from "@/store/slices/authSlice";

export default function ReactProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setAuthFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}
