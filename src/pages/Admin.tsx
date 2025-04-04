
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, X, Search } from "lucide-react";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";

type Reservation = {
  id: string;
  reference: string;
  commande: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  city: string | null;
  pickup_location: string | null;
  start_date: string;
  start_time: string | null;
  end_date: string;
  end_time: string | null;
  car_id: string | null;
  car_name: string | null;
  participants: number;
  driver_age: string | null;
  price: number | null;
  status: "en_attente" | "confirmee" | "refusee";
  admin_message: string | null;
  created_at: string;
  updated_at: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"confirm" | "reject" | null>(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "en_attente" | "confirmee" | "refusee">("all");

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Obtenir l'utilisateur actuel
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Accès refusé",
            description: "Vous devez être connecté pour accéder à cette page.",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        // Vérifier si l'utilisateur a un rôle admin
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('role', 'admin');

        if (error) {
          console.error("Erreur lors de la vérification du rôle:", error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la vérification de vos permissions.",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        if (!roles || roles.length === 0) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        setIsAdmin(true);
        fetchReservations();
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      let query = supabase.from('reservations').select('*');

      // Appliquer le filtre par statut si ce n'est pas "all"
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      // Trier par date de création (les plus récentes d'abord)
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setReservations(data as Reservation[]);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const handleAction = (reservation: Reservation, type: "confirm" | "reject") => {
    setSelectedReservation(reservation);
    setActionType(type);
    setAdminMessage(reservation.admin_message || "");
    setIsActionModalOpen(true);
  };

  const submitAction = async () => {
    if (!selectedReservation || !actionType) return;

    try {
      // Appel à l'edge function pour envoyer la notification par email
      const response = await fetch(`https://fvxhbjypaybgmqsfyfbb.supabase.co/functions/v1/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          type: actionType === 'confirm' ? 'confirm-reservation' : 'reject-reservation',
          reservationId: selectedReservation.id,
          adminMessage: adminMessage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue');
      }

      toast({
        title: actionType === 'confirm' ? "Réservation confirmée" : "Réservation refusée",
        description: "Un email a été envoyé au client.",
      });

      // Rafraîchir la liste des réservations
      fetchReservations();
      setIsActionModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'action:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la notification.",
        variant: "destructive"
      });
    }
  };

  // Filtrer les réservations en fonction de la recherche
  const filteredReservations = reservations.filter(res => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      res.reference.toLowerCase().includes(searchLower) ||
      res.commande.toLowerCase().includes(searchLower) ||
      res.full_name.toLowerCase().includes(searchLower) ||
      res.email.toLowerCase().includes(searchLower) ||
      (res.car_name && res.car_name.toLowerCase().includes(searchLower))
    );
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'confirmee':
        return 'bg-green-500/20 text-green-500';
      case 'refusee':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-white mb-4">Vérification des permissions...</h1>
          <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <CustomNavbar />
      <main className="container mx-auto px-4 py-10 pt-32">
        <div className="bg-[#1A1F2C]/90 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-playfair font-bold text-white mb-6">Administration des réservations</h1>
          
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="w-full pl-10 bg-[#121212] border-gray-700 text-white"
                placeholder="Rechercher par référence, nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-full md:w-[180px] bg-[#121212] border-gray-700 text-white">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-gray-700">
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="confirmee">Confirmée</SelectItem>
                <SelectItem value="refusee">Refusée</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={fetchReservations} className="bg-blue-600 hover:bg-blue-700">
              Actualiser
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin h-10 w-10 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableCaption>Liste des réservations ({filteredReservations.length})</TableCaption>
                <TableHeader>
                  <TableRow className="hover:bg-[#2A2F3C] border-gray-700">
                    <TableHead className="text-white">Référence</TableHead>
                    <TableHead className="text-white">Client</TableHead>
                    <TableHead className="text-white">Véhicule</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Prix</TableHead>
                    <TableHead className="text-white">Statut</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                        Aucune réservation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id} className="hover:bg-[#2A2F3C] border-gray-700">
                        <TableCell className="font-medium text-gray-300">{reservation.reference}</TableCell>
                        <TableCell className="text-gray-300">{reservation.full_name}</TableCell>
                        <TableCell className="text-gray-300">{reservation.car_name || "Non spécifié"}</TableCell>
                        <TableCell className="text-gray-300">{formatDate(reservation.created_at)}</TableCell>
                        <TableCell className="text-gray-300">{reservation.price ? `${reservation.price}€` : "-"}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeClass(reservation.status)}`}>
                            {reservation.status === 'en_attente' ? 'En attente' : 
                             reservation.status === 'confirmee' ? 'Confirmée' : 'Refusée'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-gray-700 text-gray-300 hover:text-white hover:bg-[#2A2F3C]"
                              onClick={() => handleDetails(reservation)}
                            >
                              Détails
                            </Button>
                            
                            {reservation.status === 'en_attente' && (
                              <>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="border-green-700 text-green-500 hover:bg-green-900/20"
                                  onClick={() => handleAction(reservation, 'confirm')}
                                >
                                  <Check className="w-4 h-4 mr-1" /> Confirmer
                                </Button>
                                
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="border-red-700 text-red-500 hover:bg-red-900/20"
                                  onClick={() => handleAction(reservation, 'reject')}
                                >
                                  <X className="w-4 h-4 mr-1" /> Refuser
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Modal de détails */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-[#1A1F2C] text-white border-gray-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair">Détails de la réservation</DialogTitle>
            <DialogDescription className="text-gray-400">
              Référence: {selectedReservation?.reference} | Commande: {selectedReservation?.commande}
            </DialogDescription>
          </DialogHeader>

          {selectedReservation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <h3 className="font-medium text-white">Informations client</h3>
                <p><span className="text-gray-400">Nom:</span> {selectedReservation.full_name}</p>
                <p><span className="text-gray-400">Email:</span> {selectedReservation.email}</p>
                <p><span className="text-gray-400">Téléphone:</span> {selectedReservation.phone || '-'}</p>
                <p><span className="text-gray-400">Pays:</span> {selectedReservation.country || '-'}</p>
                <p><span className="text-gray-400">Ville:</span> {selectedReservation.city || '-'}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-white">Informations réservation</h3>
                <p><span className="text-gray-400">Véhicule:</span> {selectedReservation.car_name || '-'}</p>
                <p><span className="text-gray-400">Date de début:</span> {formatDate(selectedReservation.start_date)} {selectedReservation.start_time || ''}</p>
                <p><span className="text-gray-400">Date de fin:</span> {formatDate(selectedReservation.end_date)} {selectedReservation.end_time || ''}</p>
                <p><span className="text-gray-400">Participants:</span> {selectedReservation.participants}</p>
                <p><span className="text-gray-400">Prix:</span> {selectedReservation.price ? `${selectedReservation.price}€` : '-'}</p>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <h3 className="font-medium text-white">Lieu de prise en charge</h3>
                <p>{selectedReservation.pickup_location || '-'}</p>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <h3 className="font-medium text-white">Message administrateur</h3>
                <p>{selectedReservation.admin_message || '-'}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal d'action (confirmer/refuser) */}
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent className="bg-[#1A1F2C] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair">
              {actionType === 'confirm' ? 'Confirmer la réservation' : 'Refuser la réservation'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {actionType === 'confirm' 
                ? 'Confirmez cette réservation et envoyez une notification au client.' 
                : 'Refusez cette réservation et informez le client.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Message au client
              </label>
              <Textarea 
                placeholder="Ajoutez un message personnalisé pour le client..."
                className="bg-[#121212] border-gray-700 text-white min-h-[100px]"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsActionModalOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={submitAction}
              className={actionType === 'confirm' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {actionType === 'confirm' ? 'Confirmer' : 'Refuser'} la réservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Admin;
