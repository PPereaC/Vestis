import { Injectable, inject } from '@angular/core';
import { SupabaseClientService } from '../../core/services/supabase-client.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private supabaseClient = inject(SupabaseClientService);

    async getProducts() {
        const { data, error } = await this.supabaseClient.supabase
            .from('productos')
            .select('*');

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }
        return data || [];
    }
}