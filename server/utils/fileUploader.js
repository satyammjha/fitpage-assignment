import { createRequire } from 'module';
import { v4 as uuid } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const uploadToSupabase = async (file) => {
    const ext = path.extname(file.originalname);
    const fileName = `reviews/${uuid()}${ext}`;
    const fileBuffer = file.buffer;

    const { data, error } = await supabase.storage
        .from('product-reviews')
        .upload(fileName, fileBuffer, {
            contentType: file.mimetype,
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw new Error('Upload to Supabase failed');
    }

    return `${process.env.SUPABASE_URL}/storage/v1/object/public/product-reviews/${data.path}`;
};

export default uploadToSupabase;