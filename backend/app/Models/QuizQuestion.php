<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = ['quiz_id','question_text','question_order'];
    public function quiz(){
        return $this->belongsTo(Quiz::class);
    }
    public function quizQuestionOptions(){
        return $this->hasMany(QuizQuestionOption::class);
    }
}
