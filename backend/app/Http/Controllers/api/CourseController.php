<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return Course::with('lessons')->get();
    }

    public function show($id)
    {
        return Course::with('lessons')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $course = Course::create([
            'user_id' => $request->user()?->id ?? 1,
            'title' => $request->title,
            'description' => $request->description,
            'thumbnail' => $request->thumbnail,
        ]);

        return response()->json($course, 201);
    }
}
