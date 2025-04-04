
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL");
const supabaseUrl = "https://fvxhbjypaybgmqsfyfbb.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface ReservationRequest {
  id: string;
  reference: string;
  commande: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  pickup_location: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  car_id: string;
  car_name: string;
  participants: number;
  driver_age: string;
  price: number;
}

interface EmailRequest {
  type: "new-reservation" | "confirm-reservation" | "reject-reservation";
  reservationId: string;
  adminMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { type, reservationId, adminMessage } = await req.json() as EmailRequest;

    console.log(`Processing ${type} for reservation ${reservationId}`);
    
    // Récupérer les détails de la réservation
    const { data: reservation, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
      .single();

    if (error || !reservation) {
      console.error("Error fetching reservation:", error);
      return new Response(
        JSON.stringify({ error: "Réservation non trouvée" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let emailResponse;

    switch (type) {
      case "new-reservation":
        // Envoyer un email à l'administrateur pour notification d'une nouvelle réservation
        emailResponse = await sendAdminNotification(reservation);
        break;
      
      case "confirm-reservation":
        // Mettre à jour le statut de la réservation
        const { error: updateError } = await supabase
          .from("reservations")
          .update({ status: "confirmee", admin_message: adminMessage })
          .eq("id", reservationId);

        if (updateError) {
          console.error("Error updating reservation:", updateError);
          return new Response(
            JSON.stringify({ error: "Erreur lors de la mise à jour de la réservation" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Envoyer un email de confirmation au client
        emailResponse = await sendClientConfirmation(reservation, adminMessage);
        break;
      
      case "reject-reservation":
        // Mettre à jour le statut de la réservation
        const { error: rejectError } = await supabase
          .from("reservations")
          .update({ status: "refusee", admin_message: adminMessage })
          .eq("id", reservationId);

        if (rejectError) {
          console.error("Error updating reservation:", rejectError);
          return new Response(
            JSON.stringify({ error: "Erreur lors de la mise à jour de la réservation" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Envoyer un email de refus au client
        emailResponse = await sendClientRejection(reservation, adminMessage);
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: "Type d'email non valide" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

async function sendAdminNotification(reservation: any) {
  // URL de base pour l'application
  const appUrl = "https://tamtamvoyage.lovable.ai";

  // Créer un lien avec les paramètres pour l'interface d'administration
  const adminLink = `${appUrl}/admin/reservations/${reservation.id}`;

  const { reference, commande, full_name, email, phone, country, city, pickup_location,
    start_date, start_time, end_date, end_time, car_name, participants, driver_age, price } = reservation;

  return await resend.emails.send({
    from: "TamtamVoyage <onboarding@resend.dev>",
    to: [adminEmail],
    subject: `Nouvelle réservation: ${reference}`,
    html: `
      <h1>Nouvelle demande de réservation</h1>
      <p>Une nouvelle demande de réservation a été reçue avec les détails suivants:</p>
      
      <h2>Détails de la réservation</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Référence:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${reference}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>N° de commande:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${commande}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Client:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${full_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Téléphone:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone || 'Non spécifié'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pays:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${country || 'Non spécifié'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Ville:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${city || 'Non spécifiée'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Lieu de prise en charge:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${pickup_location || 'Non spécifié'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date de début:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${start_date} à ${start_time || '00:00'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date de fin:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${end_date} à ${end_time || '00:00'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Véhicule:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${car_name || 'Non spécifié'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nombre de participants:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${participants}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Âge du conducteur:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${driver_age || 'Non spécifié'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Prix:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${price ? `${price}€` : 'Non spécifié'}</td>
        </tr>
      </table>
      
      <div style="margin-top: 20px;">
        <p>Pour gérer cette réservation, veuillez cliquer sur le lien ci-dessous:</p>
        <a href="${adminLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; text-decoration: none;">Gérer cette réservation</a>
      </div>
    `,
  });
}

async function sendClientConfirmation(reservation: any, adminMessage: string = "") {
  const { reference, commande, full_name, email, start_date, end_date, car_name, price } = reservation;

  return await resend.emails.send({
    from: "TamtamVoyage <onboarding@resend.dev>",
    to: [email],
    subject: `Réservation confirmée: ${reference}`,
    html: `
      <h1>Votre réservation a été confirmée</h1>
      <p>Cher(e) ${full_name},</p>
      <p>Nous avons le plaisir de vous informer que votre réservation a été confirmée.</p>
      
      <h2>Détails de la réservation</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Référence:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${reference}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>N° de commande:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${commande}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date de début:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${start_date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date de fin:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${end_date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Véhicule:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${car_name || 'Non spécifié'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Prix total:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${price ? `${price}€` : 'Non spécifié'}</td>
        </tr>
      </table>
      
      ${adminMessage ? `<div style="margin-top: 20px;"><h3>Message de l'administrateur:</h3><p>${adminMessage}</p></div>` : ''}
      
      <div style="margin-top: 20px;">
        <p>Nous vous remercions d'avoir choisi TamtamVoyage et nous nous réjouissons de vous accueillir.</p>
        <p>Pour toute question ou besoin d'assistance, n'hésitez pas à nous contacter.</p>
      </div>
      
      <div style="margin-top: 20px;">
        <p>Cordialement,<br>L'équipe TamtamVoyage</p>
      </div>
    `,
  });
}

async function sendClientRejection(reservation: any, adminMessage: string = "") {
  const { reference, commande, full_name, email } = reservation;

  return await resend.emails.send({
    from: "TamtamVoyage <onboarding@resend.dev>",
    to: [email],
    subject: `Information concernant votre réservation: ${reference}`,
    html: `
      <h1>Information concernant votre réservation</h1>
      <p>Cher(e) ${full_name},</p>
      <p>Nous vous informons que votre demande de réservation n'a pas pu être acceptée.</p>
      
      <div>
        <p><strong>Référence:</strong> ${reference}</p>
        <p><strong>N° de commande:</strong> ${commande}</p>
      </div>
      
      ${adminMessage ? `<div style="margin-top: 20px;"><h3>Message de l'administrateur:</h3><p>${adminMessage}</p></div>` : ''}
      
      <div style="margin-top: 20px;">
        <p>Nous vous remercions de votre compréhension et espérons avoir l'opportunité de vous servir à l'avenir.</p>
        <p>Pour toute question ou besoin d'assistance, n'hésitez pas à nous contacter.</p>
      </div>
      
      <div style="margin-top: 20px;">
        <p>Cordialement,<br>L'équipe TamtamVoyage</p>
      </div>
    `,
  });
}

serve(handler);
