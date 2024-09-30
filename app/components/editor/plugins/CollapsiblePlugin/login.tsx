"use client";

import useHasHydrate from "@/hook/useHydrate";
import useScholarToken from "@/hook/useScholarToken";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import styles from "../../../../app/components/Common/CroucherScholarLogin/ScholarLogin.module.scss";
import useScholarStore from "@/store/scholarStore";
import { useSearchParams } from "next/navigation";

export default function IsLoggedIn() {
  const { hasHydrate } = useHasHydrate();
  const { token } = useScholarToken();
  const { scholar } = useScholarStore();
  const searchParmas = useSearchParams();
  const pid = searchParmas.get("pid");

  useEffect(() => {
    if (!token && hasHydrate) {
      setTimeout(() => {
        const loginPopup = document.getElementById("login-popup");
        if (loginPopup) {
          loginPopup.classList.add(styles.auth_container_open);
        }
        toast.error("Please sign in to continue.", {
          duration: 3500,
        });
      }, 10);
    }
    if (token) {
      window.location.reload();
    }
    // console.log("token", token);
  }, [token, hasHydrate]);

  const isAdmin = useMemo(() => {
    if (scholar?.data?.attributes?.roles) {
      const isDeveloper =
        scholar?.data?.attributes?.roles?.includes("Developer");
      const isAdmin = scholar?.data?.attributes?.roles?.includes("Admin");
      return isDeveloper || isAdmin ? true : false;
    }
    return false;
  }, [scholar?.data?.attributes?.roles]);

  useEffect(() => {
    if (scholar && isAdmin) {
      // toast.error('Something went wrong');
      if(pid) {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    } else if (scholar) {
      window.location.reload();
    }
  }, [scholar, isAdmin, pid]);

  return null;
}
