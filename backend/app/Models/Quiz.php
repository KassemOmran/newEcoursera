<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Termwind\Question;

class Quiz extends Model
{
   protected $fillable = ['lesson_id','title'];

   public function lesson(){
    return $this->belongsTo(Lesson::class);
   }
   public function questions(){
    return $this->hasMany(QuizQuestion::class);
   }
}
