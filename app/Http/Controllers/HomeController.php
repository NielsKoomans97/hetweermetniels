<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\View\View;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(): View
    {
        $posts = Post::factory()->count(10)->make();

        if (isset($posts) && !empty($posts)) {
            return view('welcome')->with('posts', $posts);
        } else {
            return view('welcome');
        }
    }
}
