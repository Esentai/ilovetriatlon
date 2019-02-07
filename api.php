<?php
//$conn = new mysqli("srv-pleskdb39.ps.kz:3306", "ilove_database", "Database123", "ilovetri_database");
$conn = new mysqli("ironman", "root", "", "ironman");
//$conn = new mysqli("localhost", "id8614924_esentai", "Esentai123", "id8614924_ironman");
if ($conn->connect_error){
  die("Cloud not connect to database!");
}
$data = json_decode(file_get_contents("php://input"));
$res = array('error' => false);

$action = 'read';

if (isset($_GET['action'])){
  $action = $_GET['action'];
}

if ($action == 'read'){
  $result = $conn->query("SELECT * FROM `auth`");
  $competition = array();

  while($row = $result->fetch_assoc()){
    array_push($competition, $row);
  }

  $res['auth'] = $competition;

}


if ($action == 'read'){
  $result = $conn->query("SELECT * FROM `competition`");
  $competition = array();

  while($row = $result->fetch_assoc()){
    array_push($competition, $row);
  }

  $res['competition'] = $competition;

}

if ($action == 'read'){
  $result = $conn->query("SELECT * FROM `team`");
  $team = array();

  while($row = $result->fetch_assoc()){
    array_push($team, $row);
  }

  $res['team'] = $team;

}


if ($action == 'read'){
  $result = $conn->query("SELECT * FROM `user`");
  $user = array();

  while($row = $result->fetch_assoc()){
    array_push($user, $row);
  }

  $res['user'] = $user;

}
if ($action == 'createUser'){

  $name = $_POST['name'];
  $competition = $_POST['competition'];
  $date = $_POST['date'];
  $distance = $_POST['data'];
  $stage = $_POST['stage'];
  $goal = $_POST['goal'];
  $achievement = $_POST['achievement'];
  $сomment = $_POST['comments'];
  $phoneNumber = $_POST['phoneNumber'];
  $email = $_POST['email'];
  $vk = $_POST['vk'];
  $facebook  = $_POST['facebook'];
  
  // $result = $conn->query("INSERT INTO `user` ('name', 'competition', 'date', 'distance', 'stage', 'goal', 'achievement', 'сomment', 'phoneNumber', 'email', 'vk', 'facebook') VALUES ('$name', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook') ");

  $result = $conn->query("INSERT INTO `user` (`UserId`, `name`, `competition`, `date`, `distance`, `stage`, `goal`, `achievement`, `сomment`, `phoneNumber`, `email`, `vk`, `facebook`) VALUES (NULL, '$name', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook')");

  if ($result) {
    $res['message'] = "User added successfully";
  } else{
    $res['error'] = true;
    $res['message'] = 'Could not insert user';
  }

  $res['user'] = $user;

}


if ($action == 'createTeam'){
  $teamName = $_POST['teamName'];
  $searchName = $_POST['searchName'];
  $searchDistance = $_POST['searchDistance'];
  $name = $_POST['name'];
  $competition = $_POST['competition'];
  $date = $_POST['date'];
  $distance = $_POST['distance'];
  $stage = $_POST['stage'];
  $goal = $_POST['goal'];
  $achievement = $_POST['achievement'];
  $сomment = $_POST['comments'];
  $phoneNumber = $_POST['phoneNumber'];
  $email = $_POST['email'];
  $vk = $_POST['vk'];
  $facebook  = $_POST['facebook'];
  
  // $result = $conn->query("INSERT INTO `user` ('name', 'competition', 'date', 'distance', 'stage', 'goal', 'achievement', 'сomment', 'phoneNumber', 'email', 'vk', 'facebook') VALUES ('$name', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook') ");

  $result = $conn->query("INSERT INTO `team` (`UserId`, `teamName`, `name`, `searchName`, `searchDistance`, `competition`, `date`, `distance`, `stage`, `goal`, `achievement`, `сomment`, `phoneNumber`, `email`, `vk`, `facebook`) VALUES (NULL, '$teamName', '$name', '$searchName', '$searchDistance', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook')");

  if ($result) {
    $res['message'] = "User added successfully";
  } else{
    $res['error'] = true;
    $res['message'] = 'Could not insert user';
  }

  $res['team'] = $team;

}


if($action == 'deleteTeam'){
  $id = $data->id;
  $result =  $conn->query("DELETE FROM team WHERE UserId =".$id);
  if ($result){
    echo "Delete successfully";
  }else{
    echo "Error $id";
  }

  exit;
}

if($action == 'deleteUser'){
  $id = $data->id;
  $result =  $conn->query("DELETE FROM user WHERE UserId =".$id);
  if ($result){
    echo "Delete successfully";
  }else{
    echo "Error";
  }

  exit;
}


$conn->close();

header("Content-type: application/json");
echo json_encode($res);
die();
