// src/pages/politica-de-privacidad.js

import React from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Política de Privacidad / Privacy Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
            {/* Pega aquí el texto de la plantilla que te di arriba */}
            {/* Simplemente lo pegaré aquí para que sea un solo paso para ti */}
            
            <p><strong>Fecha de entrada en vigor:</strong> 25 de agosto de 2025</p>

            <h2 className="text-2xl font-semibold">Español</h2>

            <h3 className="text-xl font-semibold">1. Introducción</h3>
            <p>Bienvenido a Voces de Esperanza ("nosotros", "nuestro"). Respetamos tu privacidad y nos comprometemos a protegerla. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestra aplicación móvil y sitio web (colectivamente, el "Servicio").</p>

            <h3 className="text-xl font-semibold">2. Información que Recopilamos</h3>
            <p>No recopilamos información de identificación personal como tu nombre, dirección o número de teléfono, ya que no se requiere crear una cuenta para usar nuestro Servicio. La información que recopilamos es principalmente técnica y anónima:</p>
            <ul>
              <li><strong>Datos de Uso (vía Google Analytics):</strong> Recopilamos información anónima sobre cómo interactúas con nuestro Servicio. Esto incluye qué páginas visitas, qué funciones utilizas y la duración de tus sesiones. Usamos estos datos para entender cómo se utiliza nuestro Servicio y cómo podemos mejorarlo.</li>
              <li><strong>Identificador de Dispositivo para Notificaciones (vía OneSignal):</strong> Si aceptas recibir notificaciones push, nuestro proveedor de servicios, OneSignal, generará un identificador anónimo para tu dispositivo. No vinculamos este identificador con ninguna información personal. Lo usamos únicamente para enviarte los recordatorios diarios de devocionales que has solicitado.</li>
            </ul>

            <h3 className="text-xl font-semibold">3. Cómo Usamos tu Información</h3>
            <p>Utilizamos la información que recopilamos para:</p>
            <ul>
              <li>Proveer, operar y mantener nuestro Servicio.</li>
              <li>Mejorar, personalizar y expandir nuestro Servicio.</li>
              <li>Entender y analizar cómo utilizas nuestro Servicio.</li>
              <li>Enviar notificaciones push diarias, si has dado tu consentimiento.</li>
            </ul>

            <h3 className="text-xl font-semibold">4. Servicios de Terceros</h3>
            <p>Utilizamos los siguientes servicios de terceros que pueden recopilar información:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Para análisis de uso. Puedes leer su política de privacidad <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aquí</a>.</li>
              <li><strong>OneSignal:</strong> Para la gestión de notificaciones push. Puedes leer su política de privacidad <a href="https://onesignal.com/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aquí</a>.</li>
            </ul>
            <p>No vendemos ni compartimos tu información personal con nadie más.</p>

            <h3 className="text-xl font-semibold">5. Tus Derechos</h3>
            <p>Tienes derecho a:</p>
            <ul>
              <li><strong>Desactivar las notificaciones push:</strong> Puedes hacerlo en cualquier momento desde los ajustes de tu dispositivo.</li>
              <li><strong>Optar por no participar en Google Analytics:</strong> Google ofrece herramientas para gestionar tus datos, como el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Complemento de inhabilitación para navegadores de Google Analytics</a>.</li>
            </ul>

            <h3 className="text-xl font-semibold">6. Seguridad de los Datos</h3>
            <p>Tomamos medidas razonables para proteger la información que recopilamos. Sin embargo, ningún sistema es 100% seguro, y no podemos garantizar la seguridad absoluta de tus datos.</p>

            <h3 className="text-xl font-semibold">7. Privacidad de los Niños</h3>
            <p>Nuestro Servicio no está dirigido a menores de 13 años. No recopilamos intencionadamente información de identificación personal de niños.</p>

            <h3 className="text-xl font-semibold">8. Cambios a esta Política</h3>
            <p>Podemos actualizar nuestra política de privacidad de vez en cuando. Te notificaremos de cualquier cambio publicando la nueva política en esta página.</p>

            <h3 className="text-xl font-semibold">9. Contáctanos</h3>
            <p>Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos:</p>
            <ul>
              <li><strong>Responsable:</strong> [El Equipo de Voces de Esperanza]</li>
              <li><strong>Email:</strong> voces.deesperanza025@gmail.com</li>
            </ul>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <h2 className="text-2xl font-semibold">English</h2>
            
            <h3 className="text-xl font-semibold">1. Introduction</h3>
            <p>Welcome to Voices of Hope ("we", "us", "our"). We respect your privacy and are committed to protecting it. This privacy policy explains how we collect, use, and safeguard your information when you use our mobile application and website (collectively, the "Service").</p>

            <h3 className="text-xl font-semibold">2. Information We Collect</h3>
            <p>We do not collect personally identifiable information such as your name, address, or phone number, as no account creation is required to use our Service. The information we collect is primarily technical and anonymous:</p>
            <ul>
                <li><strong>Usage Data (via Google Analytics):</strong> We collect anonymous information about how you interact with our Service. This includes which pages you visit, features you use, and the duration of your sessions. We use this data to understand how our Service is being used and how we can improve it.</li>
                <li><strong>Device Identifier for Notifications (via OneSignal):</strong> If you opt-in to receive push notifications, our service provider, OneSignal, will generate an anonymous identifier for your device. We do not link this identifier to any personal information. We use it solely to send you the daily devotional reminders you requested.</li>
            </ul>

            <h3 className="text-xl font-semibold">3. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide, operate, and maintain our Service.</li>
                <li>Improve, personalize, and expand our Service.</li>
                <li>Understand and analyze how you use our Service.</li>
                <li>Send you daily push notifications, if you have consented.</li>
            </ul>

            <h3 className="text-xl font-semibold">4. Third-Party Services</h3>
            <p>We use the following third-party services that may collect information:</p>
            <ul>
                <li><strong>Google Analytics:</strong> For usage analytics. You can read their privacy policy <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">here</a>.</li>
                <li><strong>OneSignal:</strong> For push notification management. You can read their privacy policy <a href="https://onesignal.com/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">here</a>.</li>
            </ul>
            <p>We do not sell or share your personal information with anyone else.</p>
            
            <h3 className="text-xl font-semibold">5. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
                <li><strong>Disable Push Notifications:</strong> You can do this at any time through your device's settings.</li>
                <li><strong>Opt-out of Google Analytics:</strong> Google provides tools to manage your data, such as the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a>.</li>
            </ul>

            <h3 className="text-xl font-semibold">6. Data Security</h3>
            <p>We take reasonable measures to protect the information we collect. However, no system is 100% secure, and we cannot guarantee the absolute security of your data.</p>
            
            <h3 className="text-xl font-semibold">7. Children's Privacy</h3>
            <p>Our Service is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children.</p>

            <h3 className="text-xl font-semibold">8. Changes to This Policy</h3>
            <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

            <h3 className="text-xl font-semibold">9. Contact Us</h3>
            <p>If you have any questions about this privacy policy, you can contact us:</p>
            <ul>
                <li><strong>Data Controller:</strong> [The Voices of Hope Team]</li>
                <li><strong>Email:</strong> voces.deesperanza025@gmail.com</li>
            </ul>

          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {t("common.backToHome")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;