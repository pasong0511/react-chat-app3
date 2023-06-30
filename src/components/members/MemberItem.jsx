import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function MemberItem({ username }) {
    return (
        <li className="member-name-item">
            <p>{username}</p>
        </li>
    );
}

export default MemberItem;
