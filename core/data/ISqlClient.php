<?php

interface ISqlClient
{
    public function Select($table, $columns = [], $conditions = []);
    public function Insert($table, $values, $conditions = []);
    public function Move($columns, $to, $condition = '');
    public function Delete($condition = '');
}
