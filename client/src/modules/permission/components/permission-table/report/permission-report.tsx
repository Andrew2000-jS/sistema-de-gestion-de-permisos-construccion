"use client";
import { constructionTypeAdapter } from "@/modules/permission/adapters";
import { Permission } from "@/modules/permission/entities";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";

function PermissionReport({ permission }: { permission: Permission }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerWrapper}>
          <Image src="/logo-veneco.png" style={styles.logo} />
          <View style={styles.header}>
            <Text style={styles.title}>
              REPÚBLICA BOLIVARIANA DE VENEZUELA {"\n"}
              ALCALDÍA DEL MUNICIPIO CARIRUBANA {"\n"}
              DIRECCIÓN SECTORIAL DE DESARROLLO LOCAL {"\n"}
              OFICINA DE PLANIFICACIÓN URBANA Y RURAL
            </Text>
            <Text style={styles.title}>
              PERMISO DE CONSTRUCCIÓN N°. {format(new Date(), "yyyy")}-0
              {permission.id}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.bodyText}>
            NOMBRE DEL PROPIETARIO:
            <Text style={styles.name}>
              {permission.owner.name.toUpperCase()}
            </Text>
          </Text>
          <View style={styles.flexBodyText}>
            <Text style={styles.bodyText}>
              NOMBRE DEL PROFESIONAL RESPONSABLE:
              <Text style={styles.name}>{permission.construction.manager}</Text>
            </Text>
            <Text style={styles.bodyText}>
              C.I.V:
              <Text style={{ ...styles.name, marginRight: "10px" }}>
                {permission.civ}
              </Text>
            </Text>
          </View>
          <Text style={styles.bodyText}>
            NOMBRE DEL CONSTRUCTOR:
            <Text style={styles.name}>{permission.construction.manager}</Text>
          </Text>
          <Text style={styles.bodyText}>
            CLASE DE CONSTRUCCION:
            <Text style={styles.name}>
              {constructionTypeAdapter(
                permission.construction.type
              ).translatedType.toUpperCase()}
            </Text>
          </Text>
          <Text style={styles.bodyText}>
            UBICACION DE LA OBRA:
            <Text style={styles.name}>
              {permission.construction.address.toUpperCase()}
            </Text>
          </Text>
          <View style={styles.flexBodyText}>
            <Text style={styles.bodyText}>
              PERMISO DE INGENIERIA SANITARIA:
              <Text style={styles.name}>
                {permission.construction.sanitaryPermit.toUpperCase()}
              </Text>
            </Text>
            <Text style={styles.bodyText}>
              FECHA:
              <Text style={styles.name}>
                {format(permission.date, "d/mM/yyyy")}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: "extrabold" }}>ARTICULO 19.</Text> En
            toda construcción deberá instalarse desde el inicio de la obra hasta
            su conclusión, una valla cuyas dimensiones mínimas serán de 1 m de
            altura por 1,50 m de largo, en la cual figuren nombres y apellidos
            del propietario o propietaria, del profesional responsable, del
            ingeniero responsable, del ingeniero residente, su número de
            inscripción en el Colegio de Ingenieros de Venezuela, el nombre de
            la empresa constructora, número y fecha del permiso otorgado por
            OPUR.
          </Text>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: "extrabold" }}>ARTICULO 30.</Text> Toda
            obra deberá ser ejecutada en todas sus partes, de acuerdo con los
            planos aprobados por la Oficina de Planificación Urbano Rural.
            Cualquier modificación que se desee introducir en la obra deberá,
            previamente, ser aprobada por la Oficina de Planificación Urbano
            Rural.
          </Text>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: "extrabold" }}>ARTICULO 32.</Text> Una
            vez terminada la construcción de una obra, el interesado deberá
            solicitar, para que la misma pueda ser puesta en servicio para el
            fin que ha sido destinada, el permiso de habitabilidad, que otorgará
            la Oficina de Planificación Urbano Rural después de comprobar que la
            construcción se ha realizado de acuerdo con el permiso concedido y
            que se han cumplido los requisitos legales pertinentes.
          </Text>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: "ultrabold" }}>ARTICULO 34.</Text> Todo
            permiso caducará a los seis (6) meses después de concedido, si
            dentro de este plazo no se hubieren iniciado las obras
            correspondientes.
          </Text>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: "extrabold" }}>ARTICULO 35.</Text> La
            paralización de una obra por más de seis (6) meses producirá la
            caducidad del permiso otorgado. Para reanudar los trabajos será
            necesario renovar el permiso. Se exceptúan aquellas cuya
            construcción se ha previsto por etapas y siempre que se hubiese
            hecho constar en la petición del permiso.
          </Text>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: 600 }}>ARTICULO 41.</Text> El constructor
            tendrá la obligación de notificar por escrito a la Dirección de
            Desarrollo Local con 48 horas de anticipación cuando vaya a efectuar
            los vaciados de concreto en cualquier elemento estructural. La
            Oficina de Planificación Urbana Rural verificará si el profesional
            responsable de la obra está presente en la misma a la hora fijada
            para el vaciado.
          </Text>
          <Text style={styles.articleText}>
            <Text style={{ fontWeight: "extrabold" }}>ARTICULO 45.</Text> El
            profesional que se encuentra al frente de la Dirección Técnica de
            una obra está en la obligación de notificar a la Dirección de
            Desarrollo Local el inicio de ella con una anticipación de 72 horas.
            La obra no podrá iniciarse sin la presencia del inspector de la
            Dirección de Desarrollo Local, y se verificarán los retiros
            establecidos de acuerdo con los fijados en el permiso de planos de
            construcción, dejando constancia mediante acta suscrita por ambas
            partes.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={{ marginRight: 30 }}>
            NOTA {"\n"}
            FIJARSE EN LUGAR VISIBLE
          </Text>
          <Text>JEFE DE PLANIFICACION URBANO RURAL</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  logo: {
    width: "200px",
    height: "100px",
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  bodyText: {
    marginBottom: 5,
    textAlign: "justify",
    fontSize: "10px",
  },
  flexBodyText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  articleText: {
    marginBottom: 5,
    textAlign: "justify",
    fontSize: "10px",
    lineHeight: 1.5,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    fontSize: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    textDecoration: "underline",
  },
});
export default PermissionReport;
