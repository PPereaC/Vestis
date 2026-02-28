import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { Producto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(environment.supabase.url, environment.supabase.key);
    }

    async signIn(email: string, password: string): Promise<{ error: any }> {
        const { error } = await this.supabase.auth.signInWithPassword({ email, password });
        return { error };
    }

    async signUp(email: string, password: string): Promise<{ error: any }> {
        const { error } = await this.supabase.auth.signUp({ email, password });
        return { error };
    }

    async getProductos(): Promise<Producto[]> {
        const { data, error } = await this.supabase
            .from('productos')
            .select('*');

        if (error) {
            console.error('Error cargando productos:', error);
            return [];
        }
        return data as Producto[] || [];
    }
}