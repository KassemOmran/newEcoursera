<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Quiz;
use Illuminate\Http\Request;
class QuizController extends Controller
{
    public function store(Request $request, $lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);


        if ($lesson->quiz) {
            return response()->json([
                'message' => 'Quiz already exists for this lesson'
            ], 400);
        }

        $quiz = $lesson->quiz()->create([
            'title' => $request->input('title'),

        ]);


        foreach ($request->questions as $index => $q) {
            $question = $quiz->questions()->create([
                'question_text' => $q['text'],
                'question_order' => $index + 1,
            ]);

            foreach ($q['options'] as $i => $opt) {
                $question->quizQuestionOptions()->create([
                    'option_text' => $opt,
                    'is_correct' => $i == $q['correct'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Quiz created successfully',
            'quiz' => $quiz->load('questions.quizQuestionOptions')
        ], 201);
    }
    public function destroy($lessonId)
    {
        $lesson = Lesson::with('quiz')->findOrFail($lessonId);

        if (!$lesson->quiz) {
            return response()->json(['message' => 'No quiz to delete'], 404);
        }

        $lesson->quiz->delete();

        return response()->json(['message' => 'Quiz deleted successfully']);
    }
    public function show($lessonId)
    {
        // Load lesson with quiz, questions, and options
        $lesson = Lesson::with('quiz.questions.options')->findOrFail($lessonId);

        if (!$lesson->quiz) {
            return response()->json(['message' => 'No quiz found for this lesson'], 404);
        }

        return response()->json($lesson->quiz);
    }

    public function submit(Request $request, $quizId)
{
    $quiz = Quiz::with('questions.options')->findOrFail($quizId);

    $answers = $request->input('answers', []);
    $correctCount = 0;
    $totalQuestions = $quiz->questions->count();

    foreach ($quiz->questions as $question) {
        $selectedOptionId = $answers[$question->id] ?? null;

        if (
            $selectedOptionId &&
            $question->options->contains(fn($opt) => $opt->id == $selectedOptionId && $opt->is_correct)
        ) {
            $correctCount++;
        }
    }

    $score = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;

    return response()->json([
        'score' => $score,
        'correct' => $correctCount,
        'total' => $totalQuestions,
    ]);
}

}