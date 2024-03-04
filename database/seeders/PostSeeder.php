<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('posts')->insert([
            'post_title' => fake()->title(),
            'post_content' => fake()->text(),
            'post_banner' => fake()->filePath(),
            'post_assets' => fake()->filePath(),
        ]);


    }
}
