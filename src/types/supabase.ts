export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer_text: string | null;
          created_at: string | null;
          id: number;
          question_id: number;
          references_json: Json | null;
          user_id: string;
        };
        Insert: {
          answer_text?: string | null;
          created_at?: string | null;
          id?: never;
          question_id: number;
          references_json?: Json | null;
          user_id: string;
        };
        Update: {
          answer_text?: string | null;
          created_at?: string | null;
          id?: never;
          question_id?: number;
          references_json?: Json | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'answers_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'answers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      api_keys: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          key: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          key?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          key?: string | null;
        };
        Relationships: [];
      };
      cme_redemptions: {
        Row: {
          created_at: string;
          credits: number | null;
          file_path: string | null;
          id: number;
          learning_evaluation: Json | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          credits?: number | null;
          file_path?: string | null;
          id?: number;
          learning_evaluation?: Json | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          credits?: number | null;
          file_path?: string | null;
          id?: number;
          learning_evaluation?: Json | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'cme_redemptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      conversations: {
        Row: {
          answer: string | null;
          created_at: string;
          id: number;
          question: string | null;
          references: string | null;
          session_id: string | null;
        };
        Insert: {
          answer?: string | null;
          created_at?: string;
          id?: number;
          question?: string | null;
          references?: string | null;
          session_id?: string | null;
        };
        Update: {
          answer?: string | null;
          created_at?: string;
          id?: number;
          question?: string | null;
          references?: string | null;
          session_id?: string | null;
        };
        Relationships: [];
      };
      drugs: {
        Row: {
          AdultDosing: string | null;
          AdverseDrugReactions: string | null;
          ATC_Code: string | null;
          BlackBoxWarning: string | null;
          Class: string | null;
          Contraindications: string | null;
          created_at: string;
          Dispense: string | null;
          DosingID: string | null;
          DrugID: number;
          DrugName: string | null;
          Indications: string | null;
          Instructions: string | null;
          IV_IM_Info: string | null;
          Kinetics_Dynamics: string | null;
          MechanismOfAction: string | null;
          NursingConsiderations: string | null;
          OtherInformation: string | null;
          OverdoseManagement: string | null;
          PedsDosing: string | null;
          PregnancyAndLactation: string | null;
          PregnancyCategory: string | null;
          References: string | null;
          RenalHepatic: string | null;
          RXNORMID: string | null;
          TherapeuticClasses: string | null;
          Title: string | null;
          TradeAndCost: string | null;
          updated_at: string;
        };
        Insert: {
          AdultDosing?: string | null;
          AdverseDrugReactions?: string | null;
          ATC_Code?: string | null;
          BlackBoxWarning?: string | null;
          Class?: string | null;
          Contraindications?: string | null;
          created_at?: string;
          Dispense?: string | null;
          DosingID?: string | null;
          DrugID?: number;
          DrugName?: string | null;
          Indications?: string | null;
          Instructions?: string | null;
          IV_IM_Info?: string | null;
          Kinetics_Dynamics?: string | null;
          MechanismOfAction?: string | null;
          NursingConsiderations?: string | null;
          OtherInformation?: string | null;
          OverdoseManagement?: string | null;
          PedsDosing?: string | null;
          PregnancyAndLactation?: string | null;
          PregnancyCategory?: string | null;
          References?: string | null;
          RenalHepatic?: string | null;
          RXNORMID?: string | null;
          TherapeuticClasses?: string | null;
          Title?: string | null;
          TradeAndCost?: string | null;
          updated_at?: string;
        };
        Update: {
          AdultDosing?: string | null;
          AdverseDrugReactions?: string | null;
          ATC_Code?: string | null;
          BlackBoxWarning?: string | null;
          Class?: string | null;
          Contraindications?: string | null;
          created_at?: string;
          Dispense?: string | null;
          DosingID?: string | null;
          DrugID?: number;
          DrugName?: string | null;
          Indications?: string | null;
          Instructions?: string | null;
          IV_IM_Info?: string | null;
          Kinetics_Dynamics?: string | null;
          MechanismOfAction?: string | null;
          NursingConsiderations?: string | null;
          OtherInformation?: string | null;
          OverdoseManagement?: string | null;
          PedsDosing?: string | null;
          PregnancyAndLactation?: string | null;
          PregnancyCategory?: string | null;
          References?: string | null;
          RenalHepatic?: string | null;
          RXNORMID?: string | null;
          TherapeuticClasses?: string | null;
          Title?: string | null;
          TradeAndCost?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      drugs_duplicate: {
        Row: {
          AdultDosing: string | null;
          AdverseDrugReactions: string | null;
          ATC_Code: string | null;
          BlackBoxWarning: string | null;
          Class: string | null;
          Contraindications: string | null;
          created_at: string;
          Dispense: string | null;
          DosingID: string | null;
          DrugID: number;
          DrugName: string | null;
          Indications: string | null;
          Instructions: string | null;
          IV_IM_Info: string | null;
          Kinetics_Dynamics: string | null;
          MechanismOfAction: string | null;
          NursingConsiderations: string | null;
          OtherInformation: string | null;
          OverdoseManagement: string | null;
          PedsDosing: string | null;
          PregnancyAndLactation: string | null;
          PregnancyCategory: string | null;
          References: string | null;
          RenalHepatic: string | null;
          RXNORMID: string | null;
          TherapeuticClasses: string | null;
          Title: string | null;
          TradeAndCost: string | null;
          updated_at: string;
        };
        Insert: {
          AdultDosing?: string | null;
          AdverseDrugReactions?: string | null;
          ATC_Code?: string | null;
          BlackBoxWarning?: string | null;
          Class?: string | null;
          Contraindications?: string | null;
          created_at?: string;
          Dispense?: string | null;
          DosingID?: string | null;
          DrugID?: number;
          DrugName?: string | null;
          Indications?: string | null;
          Instructions?: string | null;
          IV_IM_Info?: string | null;
          Kinetics_Dynamics?: string | null;
          MechanismOfAction?: string | null;
          NursingConsiderations?: string | null;
          OtherInformation?: string | null;
          OverdoseManagement?: string | null;
          PedsDosing?: string | null;
          PregnancyAndLactation?: string | null;
          PregnancyCategory?: string | null;
          References?: string | null;
          RenalHepatic?: string | null;
          RXNORMID?: string | null;
          TherapeuticClasses?: string | null;
          Title?: string | null;
          TradeAndCost?: string | null;
          updated_at?: string;
        };
        Update: {
          AdultDosing?: string | null;
          AdverseDrugReactions?: string | null;
          ATC_Code?: string | null;
          BlackBoxWarning?: string | null;
          Class?: string | null;
          Contraindications?: string | null;
          created_at?: string;
          Dispense?: string | null;
          DosingID?: string | null;
          DrugID?: number;
          DrugName?: string | null;
          Indications?: string | null;
          Instructions?: string | null;
          IV_IM_Info?: string | null;
          Kinetics_Dynamics?: string | null;
          MechanismOfAction?: string | null;
          NursingConsiderations?: string | null;
          OtherInformation?: string | null;
          OverdoseManagement?: string | null;
          PedsDosing?: string | null;
          PregnancyAndLactation?: string | null;
          PregnancyCategory?: string | null;
          References?: string | null;
          RenalHepatic?: string | null;
          RXNORMID?: string | null;
          TherapeuticClasses?: string | null;
          Title?: string | null;
          TradeAndCost?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      ebm: {
        Row: {
          created_at: string | null;
          id: string;
          json_data: Json;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          json_data: Json;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          json_data?: Json;
        };
        Relationships: [];
      };
      ebm_backup: {
        Row: {
          created_at: string | null;
          id: string | null;
          json_data: Json | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string | null;
          json_data?: Json | null;
        };
        Update: {
          created_at?: string | null;
          id?: string | null;
          json_data?: Json | null;
        };
        Relationships: [];
      };
      feedback: {
        Row: {
          binary_feedback: boolean | null;
          created_at: string | null;
          custom_feedback: Json | null;
          id: number;
          question_id: number;
          user_id: string;
        };
        Insert: {
          binary_feedback?: boolean | null;
          created_at?: string | null;
          custom_feedback?: Json | null;
          id?: never;
          question_id: number;
          user_id: string;
        };
        Update: {
          binary_feedback?: boolean | null;
          created_at?: string | null;
          custom_feedback?: Json | null;
          id?: never;
          question_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feedback_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'feedback_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      feedbacks: {
        Row: {
          binary_feedback: boolean | null;
          created_at: string | null;
          custom_feedback: Json | null;
          id: number;
          question_id: number;
          user_id: string;
        };
        Insert: {
          binary_feedback?: boolean | null;
          created_at?: string | null;
          custom_feedback?: Json | null;
          id?: never;
          question_id: number;
          user_id: string;
        };
        Update: {
          binary_feedback?: boolean | null;
          created_at?: string | null;
          custom_feedback?: Json | null;
          id?: never;
          question_id?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      figures: {
        Row: {
          azure_url: string;
          created_at: string | null;
          figure_name: string;
          id: number;
          key_data: string | null;
          notes: string | null;
          purpose: string | null;
          title: string | null;
          trends: string | null;
          type: string | null;
        };
        Insert: {
          azure_url: string;
          created_at?: string | null;
          figure_name: string;
          id?: number;
          key_data?: string | null;
          notes?: string | null;
          purpose?: string | null;
          title?: string | null;
          trends?: string | null;
          type?: string | null;
        };
        Update: {
          azure_url?: string;
          created_at?: string | null;
          figure_name?: string;
          id?: number;
          key_data?: string | null;
          notes?: string | null;
          purpose?: string | null;
          title?: string | null;
          trends?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      folders: {
        Row: {
          created_at: string | null;
          emoji: string | null;
          id: string;
          name: string;
          order_index: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          emoji?: string | null;
          id?: string;
          name: string;
          order_index?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          emoji?: string | null;
          id?: string;
          name?: string;
          order_index?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      invitation_codes: {
        Row: {
          code: string;
          created_at: string | null;
          id: string;
          max_uses: number | null;
          uses_count: number | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          id?: string;
          max_uses?: number | null;
          uses_count?: number | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          id?: string;
          max_uses?: number | null;
          uses_count?: number | null;
        };
        Relationships: [];
      };
      medcalc: {
        Row: {
          medcalc_id: string;
          short_comment: string | null;
          title: string;
        };
        Insert: {
          medcalc_id: string;
          short_comment?: string | null;
          title: string;
        };
        Update: {
          medcalc_id?: string;
          short_comment?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      medcalc_input_options: {
        Row: {
          id: number;
          input_id: number | null;
          selected: boolean | null;
          text: string;
          value: string;
        };
        Insert: {
          id?: number;
          input_id?: number | null;
          selected?: boolean | null;
          text: string;
          value: string;
        };
        Update: {
          id?: number;
          input_id?: number | null;
          selected?: boolean | null;
          text?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'input_options_input_id_fkey';
            columns: ['input_id'];
            isOneToOne: false;
            referencedRelation: 'medcalc_inputs';
            referencedColumns: ['id'];
          },
        ];
      };
      medcalc_inputs: {
        Row: {
          default_value: string | null;
          id: number;
          input_type: string;
          is_dynamic: boolean;
          max_value: string | null;
          medcalc_id: string | null;
          min_value: string | null;
          name: string;
          static_unit: string | null;
          var: string;
        };
        Insert: {
          default_value?: string | null;
          id?: number;
          input_type: string;
          is_dynamic?: boolean;
          max_value?: string | null;
          medcalc_id?: string | null;
          min_value?: string | null;
          name: string;
          static_unit?: string | null;
          var: string;
        };
        Update: {
          default_value?: string | null;
          id?: number;
          input_type?: string;
          is_dynamic?: boolean;
          max_value?: string | null;
          medcalc_id?: string | null;
          min_value?: string | null;
          name?: string;
          static_unit?: string | null;
          var?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'inputs_medcalc_id_fkey';
            columns: ['medcalc_id'];
            isOneToOne: false;
            referencedRelation: 'medcalc';
            referencedColumns: ['medcalc_id'];
          },
        ];
      };
      medcalc_result_options: {
        Row: {
          id: number;
          result_id: number | null;
          selected: boolean | null;
          text: string;
          value: string;
        };
        Insert: {
          id?: number;
          result_id?: number | null;
          selected?: boolean | null;
          text: string;
          value: string;
        };
        Update: {
          id?: number;
          result_id?: number | null;
          selected?: boolean | null;
          text?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'medcalc_result_options_result_id_fkey';
            columns: ['result_id'];
            isOneToOne: false;
            referencedRelation: 'medcalc_results';
            referencedColumns: ['id'];
          },
        ];
      };
      medcalc_results: {
        Row: {
          id: number;
          is_dynamic: boolean;
          lookups: string | null;
          max_value: string | null;
          medcalc_id: string | null;
          min_value: string | null;
          name: string;
          result_type: string;
          rpn: string;
          sig_digits: string | null;
          static_unit: string | null;
        };
        Insert: {
          id?: number;
          is_dynamic?: boolean;
          lookups?: string | null;
          max_value?: string | null;
          medcalc_id?: string | null;
          min_value?: string | null;
          name: string;
          result_type: string;
          rpn: string;
          sig_digits?: string | null;
          static_unit?: string | null;
        };
        Update: {
          id?: number;
          is_dynamic?: boolean;
          lookups?: string | null;
          max_value?: string | null;
          medcalc_id?: string | null;
          min_value?: string | null;
          name?: string;
          result_type?: string;
          rpn?: string;
          sig_digits?: string | null;
          static_unit?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'results_medcalc_id_fkey';
            columns: ['medcalc_id'];
            isOneToOne: false;
            referencedRelation: 'medcalc';
            referencedColumns: ['medcalc_id'];
          },
        ];
      };
      news: {
        Row: {
          created_at: string | null;
          elements: Json | null;
          id: string;
          news_date: string | null;
          news_type: string | null;
          ranking_model_ranking: number | null;
          score: number | null;
          specialties: string[] | null;
          specialty: string | null;
          timestamp: string | null;
          updated_at: string | null;
          url: string | null;
          view_count: number | null;
          selecting_model?: string | null;
          tags?: string[] | null;
          upload_id?: string | null;
          is_visible_in_prod?: boolean | null;
        };
        Insert: {
          created_at?: string | null;
          elements?: Json | null;
          id?: string;
          news_date?: string | null;
          news_type?: string | null;
          ranking_model_ranking?: number | null;
          score?: number | null;
          specialties?: string[] | null;
          specialty?: string | null;
          timestamp?: string | null;
          updated_at?: string | null;
          selecting_model?: string | null;
          url?: string | null;
          view_count?: number | null;
          tags?: string[] | null;
          upload_id?: string | null;
          is_visible_in_prod?: boolean | null;
        };
        Update: {
          selecting_model?: string | null;
          created_at?: string | null;
          elements?: Json | null;
          id?: string;
          news_date?: string | null;
          news_type?: string | null;
          ranking_model_ranking?: number | null;
          score?: number | null;
          specialties?: string[] | null;
          specialty?: string | null;
          timestamp?: string | null;
          updated_at?: string | null;
          url?: string | null;
          view_count?: number | null;
          tags?: string[] | null;
          upload_id?: string | null;
          is_visible_in_prod?: boolean | null;
        };
        Relationships: [];
      };
      news_feedback: {
        Row: {
          clinical_feedback: string | null;
          clinical_rank: number;
          created_at: string;
          id: string;
          news_id: string;
          reviewer_name: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          clinical_feedback?: string | null;
          clinical_rank: number;
          created_at?: string;
          id?: string;
          news_id: string;
          reviewer_name?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          clinical_feedback?: string | null;
          clinical_rank?: number;
          created_at?: string;
          id?: string;
          news_id?: string;
          reviewer_name?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'news_feedback_news_id_fkey';
            columns: ['news_id'];
            isOneToOne: false;
            referencedRelation: 'news';
            referencedColumns: ['id'];
          },
        ];
      };
      processing_status_upload_files_spaces: {
        Row: {
          error: string | null;
          file_id: string;
          file_name: string | null;
          progress: number | null;
          space_id: number | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          error?: string | null;
          file_id: string;
          file_name?: string | null;
          progress?: number | null;
          space_id?: number | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          error?: string | null;
          file_id?: string;
          file_name?: string | null;
          progress?: number | null;
          space_id?: number | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'processing_status_upload_files_spaces_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          answer_seen: boolean | null;
          available_credits: number | null;
          country: string | null;
          created_at: string | null;
          customer_id: string | null;
          date_of_birth: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          invitation_code: string | null;
          is_anonymous: string | null;
          is_onboarded: boolean | null;
          last_login: string | null;
          last_name: string | null;
          license_id: string | null;
          license_state: string | null;
          npi: string | null;
          occupation: number | null;
          occupation_new: string | null;
          pricing_tier: number | null;
          question_count: number | null;
          receive_insights: boolean | null;
          redeemed_credits: number | null;
          referral_code: string | null;
          referral_source: string | null;
          specialty: number | null;
          specialty_new: string | null;
          taxonomy_code: string | null;
          updated_at: string | null;
        };
        Insert: {
          answer_seen?: boolean | null;
          available_credits?: number | null;
          country?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          invitation_code?: string | null;
          is_anonymous?: string | null;
          is_onboarded?: boolean | null;
          last_login?: string | null;
          last_name?: string | null;
          license_id?: string | null;
          license_state?: string | null;
          npi?: string | null;
          occupation?: number | null;
          occupation_new?: string | null;
          pricing_tier?: number | null;
          question_count?: number | null;
          receive_insights?: boolean | null;
          redeemed_credits?: number | null;
          referral_code?: string | null;
          referral_source?: string | null;
          specialty?: number | null;
          specialty_new?: string | null;
          taxonomy_code?: string | null;
          updated_at?: string | null;
        };
        Update: {
          answer_seen?: boolean | null;
          available_credits?: number | null;
          country?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          invitation_code?: string | null;
          is_anonymous?: string | null;
          is_onboarded?: boolean | null;
          last_login?: string | null;
          last_name?: string | null;
          license_id?: string | null;
          license_state?: string | null;
          npi?: string | null;
          occupation?: number | null;
          occupation_new?: string | null;
          pricing_tier?: number | null;
          question_count?: number | null;
          receive_insights?: boolean | null;
          redeemed_credits?: number | null;
          referral_code?: string | null;
          referral_source?: string | null;
          specialty?: number | null;
          specialty_new?: string | null;
          taxonomy_code?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profiles_backup: {
        Row: {
          available_credits: number | null;
          country: string | null;
          created_at: string | null;
          customer_id: string | null;
          date_of_birth: string | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          invitation_code: string | null;
          is_anonymous: string | null;
          is_onboarded: boolean | null;
          last_login: string | null;
          last_name: string | null;
          license_id: string | null;
          license_state: string | null;
          npi: string | null;
          occupation: number | null;
          pricing_tier: number | null;
          question_count: number | null;
          redeemed_credits: number | null;
          specialty: number | null;
          updated_at: string | null;
        };
        Insert: {
          available_credits?: number | null;
          country?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          invitation_code?: string | null;
          is_anonymous?: string | null;
          is_onboarded?: boolean | null;
          last_login?: string | null;
          last_name?: string | null;
          license_id?: string | null;
          license_state?: string | null;
          npi?: string | null;
          occupation?: number | null;
          pricing_tier?: number | null;
          question_count?: number | null;
          redeemed_credits?: number | null;
          specialty?: number | null;
          updated_at?: string | null;
        };
        Update: {
          available_credits?: number | null;
          country?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          invitation_code?: string | null;
          is_anonymous?: string | null;
          is_onboarded?: boolean | null;
          last_login?: string | null;
          last_name?: string | null;
          license_id?: string | null;
          license_state?: string | null;
          npi?: string | null;
          occupation?: number | null;
          pricing_tier?: number | null;
          question_count?: number | null;
          redeemed_credits?: number | null;
          specialty?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          created_at: string | null;
          id: number;
          question_text: string | null;
          thread_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: never;
          question_text?: string | null;
          thread_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: never;
          question_text?: string | null;
          thread_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      referral_codes: {
        Row: {
          code: string;
          created_at: string | null;
          id: number;
          profile_id: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          id?: number;
          profile_id?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          id?: number;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'referral_codes_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      referrals: {
        Row: {
          id: number;
          referral_code_id: number | null;
          referred_at: string | null;
          referred_id: string | null;
          referrer_id: string | null;
        };
        Insert: {
          id?: number;
          referral_code_id?: number | null;
          referred_at?: string | null;
          referred_id?: string | null;
          referrer_id?: string | null;
        };
        Update: {
          id?: number;
          referral_code_id?: number | null;
          referred_at?: string | null;
          referred_id?: string | null;
          referrer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'referrals_referral_code_id_fkey';
            columns: ['referral_code_id'];
            isOneToOne: false;
            referencedRelation: 'referral_codes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'referrals_referred_id_fkey';
            columns: ['referred_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'referrals_referrer_id_fkey';
            columns: ['referrer_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      space_admin_requests: {
        Row: {
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          reason: string | null;
          space_id: number | null;
          status: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          reason?: string | null;
          space_id?: number | null;
          status?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          reason?: string | null;
          space_id?: number | null;
          status?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'space_admin_requests_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
      };
      space_contributors: {
        Row: {
          country: string | null;
          customer_id: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          joined_at: string | null;
          last_name: string | null;
          role: string | null;
          space_id: number | null;
          specialty_new: string | null;
          user_id: string | null;
        };
        Insert: {
          country?: string | null;
          customer_id?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          joined_at?: string | null;
          last_name?: string | null;
          role?: string | null;
          space_id?: number | null;
          specialty_new?: string | null;
          user_id?: string | null;
        };
        Update: {
          country?: string | null;
          customer_id?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          joined_at?: string | null;
          last_name?: string | null;
          role?: string | null;
          space_id?: number | null;
          specialty_new?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'space_contributors_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
      };
      space_files: {
        Row: {
          author: string | null;
          category: string | null;
          created_at: string;
          id: string;
          journal: string | null;
          name: string;
          path: string;
          processed_data: Json | null;
          processing_status: string | null;
          progress: number | null;
          resume: string | null;
          size: number;
          space_id: number;
          status: string | null;
          title: string | null;
          type: string;
          updated_at: string;
          url: string | null;
          user_id: string;
          year: string | null;
        };
        Insert: {
          author?: string | null;
          category?: string | null;
          created_at?: string;
          id: string;
          journal?: string | null;
          name: string;
          path: string;
          processed_data?: Json | null;
          processing_status?: string | null;
          progress?: number | null;
          resume?: string | null;
          size: number;
          space_id: number;
          status?: string | null;
          title?: string | null;
          type: string;
          updated_at?: string;
          url?: string | null;
          user_id: string;
          year?: string | null;
        };
        Update: {
          author?: string | null;
          category?: string | null;
          created_at?: string;
          id?: string;
          journal?: string | null;
          name?: string;
          path?: string;
          processed_data?: Json | null;
          processing_status?: string | null;
          progress?: number | null;
          resume?: string | null;
          size?: number;
          space_id?: number;
          status?: string | null;
          title?: string | null;
          type?: string;
          updated_at?: string;
          url?: string | null;
          user_id?: string;
          year?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'space_files_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
      };
      space_folder_assignments: {
        Row: {
          created_at: string | null;
          folder_id: string;
          id: string;
          space_id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          folder_id: string;
          id?: string;
          space_id: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          folder_id?: string;
          id?: string;
          space_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'space_folder_assignments_folder_id_fkey';
            columns: ['folder_id'];
            isOneToOne: false;
            referencedRelation: 'folders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'space_folder_assignments_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
      };
      space_invitations: {
        Row: {
          accepted_at: string | null;
          accepted_by: string | null;
          created_at: string | null;
          created_by: string | null;
          email: string;
          expires_at: string;
          id: string;
          is_accepted: boolean | null;
          role: string;
          space_id: number | null;
          token: string;
        };
        Insert: {
          accepted_at?: string | null;
          accepted_by?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          email: string;
          expires_at: string;
          id?: string;
          is_accepted?: boolean | null;
          role?: string;
          space_id?: number | null;
          token: string;
        };
        Update: {
          accepted_at?: string | null;
          accepted_by?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          email?: string;
          expires_at?: string;
          id?: string;
          is_accepted?: boolean | null;
          role?: string;
          space_id?: number | null;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'space_invitations_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
      };
      spaces: {
        Row: {
          access_token: string;
          created_at: string;
          custom_instructions: string | null;
          description: string | null;
          emoji: string | null;
          files_hash: string | null;
          folder_id: string | null;
          generated_questions: Json | null;
          id: number;
          image: string | null;
          image_position: Json | null;
          is_private: boolean | null;
          last_generation_timestamp: string | null;
          order_index: number | null;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          access_token: string;
          created_at?: string;
          custom_instructions?: string | null;
          description?: string | null;
          emoji?: string | null;
          files_hash?: string | null;
          folder_id?: string | null;
          generated_questions?: Json | null;
          id?: number;
          image?: string | null;
          image_position?: Json | null;
          is_private?: boolean | null;
          last_generation_timestamp?: string | null;
          order_index?: number | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          access_token?: string;
          created_at?: string;
          custom_instructions?: string | null;
          description?: string | null;
          emoji?: string | null;
          files_hash?: string | null;
          folder_id?: string | null;
          generated_questions?: Json | null;
          id?: number;
          image?: string | null;
          image_position?: Json | null;
          is_private?: boolean | null;
          last_generation_timestamp?: string | null;
          order_index?: number | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      threads: {
        Row: {
          elements: Json | null;
          id: string;
          space_id: number | null;
          thread_type: string;
          timestamp: string | null;
          user_id: string;
          view_count: number | null;
        };
        Insert: {
          elements?: Json | null;
          id: string;
          space_id?: number | null;
          thread_type?: string;
          timestamp?: string | null;
          user_id: string;
          view_count?: number | null;
        };
        Update: {
          elements?: Json | null;
          id?: string;
          space_id?: number | null;
          thread_type?: string;
          timestamp?: string | null;
          user_id?: string;
          view_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'threads_space_id_fkey';
            columns: ['space_id'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'threads_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      victoria_test: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          key: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          key: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          key?: string;
        };
        Relationships: [];
      };
      waiting_list: {
        Row: {
          country: string | null;
          created_at: string | null;
          email: string;
          id: number;
          occupation: string | null;
          specialty: string | null;
        };
        Insert: {
          country?: string | null;
          created_at?: string | null;
          email: string;
          id?: number;
          occupation?: string | null;
          specialty?: string | null;
        };
        Update: {
          country?: string | null;
          created_at?: string | null;
          email?: string;
          id?: number;
          occupation?: string | null;
          specialty?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_file_with_service_role: {
        Args: {
          file_id: string;
          file_name: string;
          file_type: string;
          file_category: string;
          file_space_id: number;
          file_url: string;
          file_size: number;
          file_status: string;
          file_user_id: string;
          file_path: string;
        };
        Returns: Json;
      };
      generate_unique_referral_code: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_space_by_token: {
        Args: { token_param: string; space_id_param?: string };
        Returns: {
          access_token: string;
          created_at: string;
          custom_instructions: string | null;
          description: string | null;
          emoji: string | null;
          files_hash: string | null;
          folder_id: string | null;
          generated_questions: Json | null;
          id: number;
          image: string | null;
          image_position: Json | null;
          is_private: boolean | null;
          last_generation_timestamp: string | null;
          order_index: number | null;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        }[];
      };
      has_valid_token_for_space: {
        Args: { space_id: number };
        Returns: boolean;
      };
      increment_credits: {
        Args: { increment_amount: number };
        Returns: undefined;
      };
      increment_question_count: {
        Args: { user_id: string };
        Returns: undefined;
      };
      increment_thread_view_count: {
        Args: { thread_id: string };
        Returns: undefined;
      };
      join_private_space_by_token: {
        Args: { token_value: string; user_id_value: string };
        Returns: Json;
      };
      populate_existing_admin_requests_user_info: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      set_space_access_token: {
        Args: { token: string };
        Returns: boolean;
      };
      update_credits: {
        Args: { user_id: string; credits_to_redeem: number };
        Returns: boolean;
      };
      update_file_with_service_role: {
        Args: {
          file_id: string;
          file_status: string;
          file_processed_data?: Json;
        };
        Returns: Json;
      };
      update_user_after_checkout: {
        Args: {
          user_id: string;
          stripe_customer_id: string;
          new_pricing_tier: number;
        };
        Returns: {
          answer_seen: boolean | null;
          available_credits: number | null;
          country: string | null;
          created_at: string | null;
          customer_id: string | null;
          date_of_birth: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          invitation_code: string | null;
          is_anonymous: string | null;
          is_onboarded: boolean | null;
          last_login: string | null;
          last_name: string | null;
          license_id: string | null;
          license_state: string | null;
          npi: string | null;
          occupation: number | null;
          occupation_new: string | null;
          pricing_tier: number | null;
          question_count: number | null;
          receive_insights: boolean | null;
          redeemed_credits: number | null;
          referral_code: string | null;
          referral_source: string | null;
          specialty: number | null;
          specialty_new: string | null;
          taxonomy_code: string | null;
          updated_at: string | null;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
