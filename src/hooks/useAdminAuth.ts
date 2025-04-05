
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
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
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate]);

  return { isAdmin, loading };
};
