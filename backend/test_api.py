import requests
import json
import sys

BASE_URL = "http://localhost:8000/api/v1"
HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def print_response(response):
    print(f"Status: {response.status_code}")
    print("Headers:", response.headers)
    try:
        print(json.dumps(response.json(), indent=2))
    except ValueError:
        print("Raw response:", response.text)

def test_programs():
    print("\n=== Testing Programs ===")
    
    # Test 1: Create program
    print("\n1. Creating program:")
    program_data = {"name": "HIV Prevention", "description": "HIV testing and counseling"}
    create_resp = requests.post(
        f"{BASE_URL}/programs/",
        json=program_data,
        headers=HEADERS
    )
    print_response(create_resp)
    
    if create_resp.status_code != 201:
        print(f"!! FAIL: Expected 201, got {create_resp.status_code} !!")
        return None
    
    program_id = create_resp.json().get("id")
    print(f"Created program ID: {program_id}")
    
    # Test 2: List programs
    print("\n2. Listing programs:")
    list_resp = requests.get(f"{BASE_URL}/programs/", headers=HEADERS)
    print_response(list_resp)
    
    if list_resp.status_code != 200:
        print(f"!! FAIL: Expected 200, got {list_resp.status_code} !!")
        return None
        
    if len(list_resp.json()) == 0:
        print("!! FAIL: No programs found in list !!")
        return None
    
    # Test 3: Get single program
    print("\n3. Getting single program:")
    detail_resp = requests.get(f"{BASE_URL}/programs/{program_id}/", headers=HEADERS)
    print_response(detail_resp)
    
    if detail_resp.status_code != 200:
        print(f"!! FAIL: Expected 200, got {detail_resp.status_code} !!")
        return None
    
    return program_id

if __name__ == "__main__":
    print("Starting API tests...")
    try:
        program_id = test_programs()
        
        if program_id:
            print("\n✅ All tests passed successfully!")
        else:
            print("\n❌ Tests failed!")
            sys.exit(1)
            
    except requests.exceptions.RequestException as e:
        print(f"\n⚠️ Connection error: {e}")
        sys.exit(1)