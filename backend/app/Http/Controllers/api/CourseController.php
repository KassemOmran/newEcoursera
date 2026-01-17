<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return Course::with('instructor')->get();
    }

    public function show($id)
    {
        $course = Course::with(['instructor'], ['lessons'])->findOrFail($id);
        return response()->json([
            'course' => $course,
            'lessons' => $course->lessons
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'thumbnail' => 'nullable|string', // optional
            'price' => 'required|numeric|min:0'
        ]);

        $course = Course::create([
            'user_id' => $request->user()?->id ?? 1,
            'title' => $request->title,
            'description' => $request->description,
            'thumbnail' => $request->thumbnail ?? $request->image,
            'category' => $request->category,
            'price' => $request->price,
        ]);

        return response()->json($course, 201);
    }
    public function myCourses()
    {
        return Course::with('lessons')
            ->where('user_id', auth()->id())
            ->get();
    }
    public function update(Request $request, $id)
    {
        $course = Course::where('user_id', auth()->id())->findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'thumbnail' => 'sometimes|url',
            'category' => 'sometimes|string|max:255',
        ]);

        $course->update($request->all());

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course
        ]);
    }
    public function destroy($id)
    {
        $course = Course::where('user_id', auth()->id())->findOrFail($id);

        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }
}
