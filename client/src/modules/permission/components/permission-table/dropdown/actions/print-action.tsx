"use client";
import { Permission } from "@/modules/permission/entities/permission.entity";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PermissionReport from "../../report/permission-report";

function PrintAction({ permission }: { permission: Permission }) {
  return (
    <PDFDownloadLink
      document={<PermissionReport />}
      fileName="permission_report.pdf"
    >
      {({ loading }) =>
        loading ? "Generando documento..." : <span>Imprimir</span>
      }
    </PDFDownloadLink>
  );
}

export default PrintAction;
