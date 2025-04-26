import requests
import json

BASE_URL = "http://localhost:8000/api"
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
    
    # Create a program
    print("\nCreating program:")
    program_data = {"name": "HIV Prevention", "description": "HIV testing and counseling"}
    create_resp = requests.post(
        f"{BASE_URL}/programs/",
        json=program_data,
        headers=HEADERS
    )
    print_response(create_resp)
    
    if create_resp.status_code != 201:
        print("!! Program creation failed !!")
        return None
    
    program_id = create_resp.json().get("id")
    
    # List programs
    print("\nListing programs:")
    list_resp = requests.get(f"{BASE_URL}/programs/", headers=HEADERS)
    print_response(list_resp)

    return program_id

if __name__ == "__main__":
    print("Starting API tests...")
    program_id = test_programs()
    
    if program_id:
        print("\nTest completed successfully!")
    else:
        print("\nTest failed! Check server logs.")