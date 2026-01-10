<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}

public function enrolledCourses()
{
    return $this->belongsToMany(
        Course::class,
        'enrollments'
    );
}
public function progresses()
{
    return $this->hasMany(Progress::class);
}
public function certificates()
{
    return $this->hasMany(Certificate::class);
}

}

