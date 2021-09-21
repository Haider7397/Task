<?php

namespace App\Repositories;

use App\Models\Student;
//use App\User;
//use Carbon\Carbon;
//use Illuminate\Support\Facades\Auth;

class studentRepository
{

    public static function fetchById($paylaod)
    {
        return Student::find($paylaod);
    }

    public static function insert($request)
    {

        $student = new Student();
        $student->firstName = $request->get('firstName');
        $student->lastName = $request->get('lastName');
        $student->dob = $request->get('dob');
        $student->courseName = $request->get('courseName');
        $student->hours = $request->get('hours');
        $student->price = $request->get('price');
        $student->save();

        return $student;
    }

    public static function fetchAll()
    {
        return Student::all();
    }

    public static function update($payload)
    {
        return Student::where('id', $payload['id'])->update([
            'firstName' => $payload['firstName'],
            'lastName' => $payload['lastName'],
            'dob' => $payload['dob'],
            'courseName' => $payload['courseName'],
            'hours' => $payload['hours'],
            'price' => $payload['price'],
        ]);
    }

    public static function delete($paylaod)
    {
        $student=Student::where('id',$paylaod['id'])->delete();
        return $student;
    }

}
