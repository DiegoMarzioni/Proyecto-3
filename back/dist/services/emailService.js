"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCancellationEmailTemplate = exports.getConfirmationEmailTemplate = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html: html || undefined,
    });
});
exports.sendEmail = sendEmail;
const getConfirmationEmailTemplate = (userName, date, time) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Turno</title>
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; margin: 0 !important; }
                .header { padding: 30px 20px !important; }
                .content { padding: 30px 20px !important; }
                .footer { padding: 20px !important; }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #333;">
        <div class="container" style="max-width: 600px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <div class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
                <div style="margin-bottom: 15px;">
                    <img src="https://i.ibb.co/1Gxb3QzQ/logo-Animacion2.png" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%; background: white; padding: 10px;" />
                </div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">¡Turno Confirmado!</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Tu cita ha sido agendada exitosamente</p>
            </div>
            
            <div class="content" style="padding: 40px 30px;">
                <div style="font-size: 18px; color: #333; margin-bottom: 25px; line-height: 1.6;">
                    <strong>¡Hola ${userName}!</strong><br>
                    Tu turno ha sido <strong style="color: #667eea;">confirmado exitosamente</strong>. Estamos emocionados de trabajar contigo en tu próximo tatuaje.
                </div>
                
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 5px solid #667eea;">
                    <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">📅 Detalles de tu cita</h3>
                    
                    <div style="display: flex; align-items: center; margin: 12px 0; font-size: 16px;">
                        <span style="margin-right: 12px;">📆</span>
                        <strong>Fecha:</strong>&nbsp;&nbsp;${date}
                    </div>
                    
                    <div style="display: flex; align-items: center; margin: 12px 0; font-size: 16px;">
                        <span style="margin-right: 12px;">🕐</span>
                        <strong>Hora:</strong>&nbsp;&nbsp;${time}
                    </div>
                    
                    <div style="display: flex; align-items: center; margin: 12px 0; font-size: 16px;">
                        <span style="margin-right: 12px;">📍</span>
                        <strong>Ubicación:</strong>&nbsp;&nbsp;Calle Gran Vía 28, 28013 Madrid, España
                    </div>
                </div>
                
                <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; color: #2e7d32;">
                    <strong>💡 Recordatorios importantes:</strong><br><br>
                    • Llega 10 minutos antes de tu cita<br>
                    • Trae una identificación válida<br>
                    • Evita el alcohol 24 horas antes<br>
                    • Come algo ligero antes de la sesión
                </div>
            </div>
            
            <div class="footer" style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #667eea; font-weight: 600; font-size: 18px;">Estudio de Tatuajes</p>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">📧 Email: contacto@estudiodetatuajes.com</p>
                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">📱 Teléfono: +54 11 1234-5678</p>
                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">🌐 Web: www.estudiodetatuajes.com</p>
                </div>
                <p style="margin-top: 20px; color: #6c757d; font-size: 12px; font-style: italic;">
                    Si necesitas cancelar o reprogramar tu cita, por favor contáctanos con al menos 24 horas de anticipación.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};
exports.getConfirmationEmailTemplate = getConfirmationEmailTemplate;
const getCancellationEmailTemplate = (userName, date, time) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cancelación de Turno</title>
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; margin: 0 !important; }
                .header { padding: 30px 20px !important; }
                .content { padding: 30px 20px !important; }
                .footer { padding: 20px !important; }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: #333;">
        <div class="container" style="max-width: 600px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            
            <div class="header" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 40px 30px; text-align: center;">
                <div style="margin-bottom: 15px;">
                    <img src="https://i.ibb.co/1Gxb3QzQ/logo-Animacion2.png" alt="Logo" style="width: 80px; height: 80px; border-radius: 50%; background: white; padding: 10px;" />
                </div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Turno Cancelado</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Tu cita ha sido cancelada</p>
            </div>
            
            <div class="content" style="padding: 40px 30px;">
                <div style="font-size: 18px; color: #333; margin-bottom: 25px; line-height: 1.6;">
                    <strong>Hola ${userName},</strong><br>
                    Tu turno ha sido <strong style="color: #e53e3e;">cancelado exitosamente</strong>. Lamentamos que no puedas acompañarnos en esta ocasión.
                </div>
                
                <div style="background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 5px solid #ff6b6b;">
                    <h3 style="color: #e53e3e; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">📅 Detalles del turno cancelado</h3>
                    
                    <div style="display: flex; align-items: center; margin: 12px 0; font-size: 16px;">
                        <span style="margin-right: 12px;">📆</span>
                        <strong>Fecha:</strong>&nbsp;&nbsp;${date}
                    </div>
                    
                    <div style="display: flex; align-items: center; margin: 12px 0; font-size: 16px;">
                        <span style="margin-right: 12px;">🕐</span>
                        <strong>Hora:</strong>&nbsp;&nbsp;${time}
                    </div>
                    
                    <div style="display: flex; align-items: center; margin: 12px 0; font-size: 16px;">
                        <span style="margin-right: 12px;">✅</span>
                        <strong>Estado:</strong>&nbsp;&nbsp;Cancelado
                    </div>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; color: #856404;">
                    <strong>⚠️ Información importante:</strong><br><br>
                    Tu turno ha sido liberado y está disponible para otros clientes.
                </div>
                
                <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center; color: #2e7d32;">
                    <strong>🎨 ¿Quieres reagendar?</strong><br><br>
                    Estaremos encantados de ayudarte a encontrar una nueva fecha que se ajuste a tu agenda.<br>
                    <strong>Contáctanos cuando estés listo para tu próximo tatuaje.</strong>
                </div>
            </div>
            
            <div class="footer" style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; color: #ff6b6b; font-weight: 600; font-size: 18px;">Estudio de Tatuajes</p>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">📧 Email: contacto@estudiodetatuajes.com</p>
                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">📱 Teléfono: +54 11 1234-5678</p>
                    <p style="margin: 5px 0; color: #6c757d; font-size: 14px;">🌐 Web: www.estudiodetatuajes.com</p>
                </div>
                <p style="margin-top: 20px; color: #6c757d; font-size: 12px; font-style: italic;">
                    ¡Esperamos verte pronto para crear arte increíble juntos!
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};
exports.getCancellationEmailTemplate = getCancellationEmailTemplate;
