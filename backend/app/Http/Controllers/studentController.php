<?php

namespace App\Http\Controllers;

use App\Repositories\studentRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class studentController extends Controller
{
    //
    public function getAllStudents(){
        $students = studentRepository::fetchAll();
        return response()->json([
            $students->toArray()
        ], 200);
    }

    public function getStudentById($id){
        $students = studentRepository::fetchById($id);
        return response()->json([
            $students->toArray()
        ], 200);
    }

    public function insert(Request $request)
    {
        $payload = $request->all();
        $validator = Validator::make($request->all(), [
            'firstName' => 'required',
            'lastName' => 'required',
            'dob' => 'required',
            'courseName' => 'required',
            'hours' => 'required',
            'price' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ]);
        }
        $student = studentRepository::insert($request);
        if ($student) {
            return response()->json([
                'status' => true,
                'message' => 'Student has been added'
            ]);
        }
    }


    public function update(Request $request)
    {
        $payload = $request->all();
        $validator = Validator::make($request->all(), [
            'id'=>'required',
            'firstName' => 'required',
            'lastName' => 'required',
            'dob' => 'required',
            'courseName' => 'required',
            'hours' => 'required',
            'price' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ]);
        }

        $student = studentRepository::update($payload);

        if ($student) {
            return response()->json([
                'status' => true,
                'message' => 'Student has been updated'
            ]);
        }
    }


    public function delete(Request $request)
    {
        $payload = $request->all();
        $validator = Validator::make($request->all(), [
            'id'=>'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ]);
        }

        $student = studentRepository::delete($payload);
        if ($student) {
            return response()->json([
                'status' => true,
                'message' => 'Student has been deleted'
            ]);
        }
    }
}
